import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type AdminTableProps = {
  title: string;
  columns: string[];
  rows: string[][];
};

export function AdminTable({ title, columns, rows }: AdminTableProps) {
  return (
    <Paper elevation={0} sx={{ border: "1px solid #e7e5e4", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`${row[0]}-${cellIndex}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
