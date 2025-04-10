export const rentalTableColumns = [
  { key: "id", label: "kod", sorting: true },
  { key: "item_name", label: "Vybavení", sorting: true },
  { key: "pieces", label: "ks", sorting: true },
  { key: "on_stock", label: "skladem", sorting: true },
  { key: "reserved", label: "zarezervováno", sorting: true },
  { key: "member_reserved", label: "zarezervoval", sorting: true },
  { key: "member_rented", label: "vypůjčil", sorting: true },
  { key: "", label: "del", id: "delLabel", sorting: false },
  { key: "", label: "edit", id: "editLabel", sorting: false },
];


export const rentalTableFrontendColumns = [
  { key: "id", label: "kod", sorting: true },
  { key: "item_name", label: "Vybavení", sorting: true },
  { key: "pieces", label: "ks", sorting: true },
  { key: "on_stock", label: "skladem", sorting: true },
  { key: "reserved", label: "zarezervováno", sorting: true },
];
