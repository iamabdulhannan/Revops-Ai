import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type Column } from "../DataTable";

type TestRow = { name: string; revenue: number; status: string };

const columns: Column<TestRow>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "revenue", label: "Revenue", sortable: true },
  { key: "status", label: "Status" },
];

const data: TestRow[] = [
  { name: "Acme Corp", revenue: 50000, status: "Active" },
  { name: "Beta Inc", revenue: 30000, status: "Churned" },
  { name: "Gamma LLC", revenue: 80000, status: "Active" },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all data rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Beta Inc")).toBeInTheDocument();
    expect(screen.getByText("Gamma LLC")).toBeInTheDocument();
  });

  it("renders 'No data available' when data is empty", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("sorts string column ascending on first click", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByText("Name"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Acme Corp");
    expect(rows[2]).toHaveTextContent("Beta Inc");
    expect(rows[3]).toHaveTextContent("Gamma LLC");
  });

  it("sorts string column descending on second click", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByText("Name"));
    await user.click(screen.getByText("Name"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Gamma LLC");
    expect(rows[2]).toHaveTextContent("Beta Inc");
    expect(rows[3]).toHaveTextContent("Acme Corp");
  });

  it("sorts numeric column ascending", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByText("Revenue"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("30000");
    expect(rows[2]).toHaveTextContent("50000");
    expect(rows[3]).toHaveTextContent("80000");
  });

  it("does not sort when clicking a non-sortable column", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByText("Status"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Acme Corp");
    expect(rows[2]).toHaveTextContent("Beta Inc");
    expect(rows[3]).toHaveTextContent("Gamma LLC");
  });

  it("uses custom render function for cells", () => {
    const columnsWithRender: Column<TestRow>[] = [
      {
        key: "revenue",
        label: "Revenue",
        render: (value) => <strong>${String(value)}</strong>,
      },
    ];

    render(<DataTable columns={columnsWithRender} data={data} />);
    expect(screen.getByText("$50000")).toBeInTheDocument();
    expect(screen.getByText("$80000")).toBeInTheDocument();
  });

  it("resets sort direction when switching to a different column", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByText("Name"));
    await user.click(screen.getByText("Name"));
    await user.click(screen.getByText("Revenue"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("30000");
    expect(rows[2]).toHaveTextContent("50000");
    expect(rows[3]).toHaveTextContent("80000");
  });

  it("applies custom className", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} className="test-class" />
    );
    expect(container.firstChild).toHaveClass("test-class");
  });
});
