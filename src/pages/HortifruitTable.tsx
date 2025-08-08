import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const ALL_COLUMNS = [
  "CODIGO",
  "DESCRICAO",
  "NCM",
  "UF",
  "% ICMS",
  "CFOP",
  "CST/CSOSN",
  "% PIS",
  "% COFINS",
  "CEST",
  "NATUREZA DA RECEITA"
] as const;

type ColumnKey = typeof ALL_COLUMNS[number];

type RowAny = Record<string, any>;

const PAGE_SIZE = 50;

const HortifruitTable = () => {
  const [rows, setRows] = useState<RowAny[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uf, setUf] = useState<string>("");
  const [ncmPrefix, setNcmPrefix] = useState<string>("");
  const [aliquota, setAliquota] = useState<string>("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<ColumnKey[]>([
    "CODIGO",
    "DESCRICAO",
    "NCM",
    "UF",
    "% ICMS",
    "CFOP",
    "CST/CSOSN",
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Hortifruti - Tabela Tributária";
  }, []);

  const toggleColumn = (key: ColumnKey) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("produtos_hortfruit")
        .select("*", { count: "exact" })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (search) {
        query = query.or(
          `DESCRICAO.ilike.%${search}%,NCM.ilike.%${search}%`
        );
      }
      if (uf) query = query.eq("UF", uf);
      if (ncmPrefix) query = query.ilike("NCM", `${ncmPrefix}%`);
      if (aliquota) query = query.ilike("% ICMS", `%${aliquota}%`);

      const { data, error, count } = await query;
      if (error) throw error;
      setRows(data || []);
      if (typeof count === "number") setTotal(count);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, uf, ncmPrefix, aliquota]);

  const totalPages = useMemo(() =>
    total ? Math.ceil(total / PAGE_SIZE) : null,
  [total]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" alt="FIZK.O" className="h-10" />
            <div>
              <h1 className="text-xl font-playfair font-bold text-fisko-blue-dark">Hortifruti - Tabelas de Dados Tributários</h1>
              <p className="text-xs text-muted-foreground">Fonte: Base interna - Supabase</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-playfair text-fisko-blue">Busca e Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Buscar por descrição ou NCM"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (setPage(0), fetchData())}
                />
              </div>
              <Select value={uf} onValueChange={(v) => { setPage(0); setUf(v); }}>
                <SelectTrigger>
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {["", "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"].map((u) => (
                    <SelectItem key={u || 'all'} value={u}>{u || 'Todas UFs'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Prefixo NCM (ex: 1101)"
                value={ncmPrefix}
                onChange={(e) => setNcmPrefix(e.target.value)}
              />
              <Input
                placeholder="ICMS contém (ex: 7%)"
                value={aliquota}
                onChange={(e) => setAliquota(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="text-sm font-semibold">Colunas:</div>
              {ALL_COLUMNS.map((col) => (
                <label key={col} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedColumns.includes(col)}
                    onCheckedChange={() => toggleColumn(col)}
                  />
                  {col}
                </label>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" onClick={() => { setPage(0); fetchData(); }}>Aplicar</Button>
                <Button variant="secondary" onClick={() => { setSearch(""); setUf(""); setNcmPrefix(""); setAliquota(""); setPage(0); fetchData(); }}>Limpar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados</span>
              {typeof total === 'number' && (
                <Badge variant="secondary">{total} itens</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {selectedColumns.map((col) => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={selectedColumns.length}>Carregando...</TableCell>
                    </TableRow>
                  ) : rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={selectedColumns.length}>Nenhum resultado encontrado.</TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row, idx) => (
                      <TableRow key={idx}>
                        {selectedColumns.map((col) => (
                          <TableCell key={col} className="whitespace-nowrap">
                            {String(row[col] ?? '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div>Página {page + 1}{totalPages ? ` de ${totalPages}` : ''}</div>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Anterior</Button>
                <Button variant="outline" disabled={totalPages !== null && page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>Próxima</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HortifruitTable;
