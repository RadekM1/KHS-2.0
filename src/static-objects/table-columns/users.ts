export const userTableColumns = [
  { key: "account", label: "účet (email)", sorting: true },
  { key: "name", label: "Jméno", sorting: true },
  { key: "last_name", label: "Příjmení", sorting: true },
  { key: "clearance", label: "Oprávnění", sorting: true },
  {
    key: "verification_token_expire",
    label: "Platnost ověření registrace",
    sorting: false,
  },
  { key: "locked", label: "Blokovaný účet", sorting: false },
];
