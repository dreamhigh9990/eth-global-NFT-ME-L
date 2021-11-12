import React, { useState, useEffect } from "react";

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiBasicTable,
  EuiButton,
} from "@elastic/eui";

import Container from "../../Styled/Container";

function extractDataForTable(data) {
  if (!data || !data.length) {
    return [];
  }

  return data.map((item) => ({
    mintAmount: item.mintAmount,
    product: item.product,
    amount: item.amount,
    date: item.date,
    serial: item.serial,
  }));
}

export default function MainProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("lastname");
    const initialValue = JSON.parse(saved);
    const events = initialValue;
    setProducts(extractDataForTable(events));
  }, []);

  const columns = [
    {
      field: "product",
      name: "Product",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "amount",
      name: "Amount",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "mintAmount",
      name: "mintAmount",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "date",
      name: "Date of Manufacture",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "serial",
      name: "Serial Number",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
  ];

  return (
    <Container>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiBasicTable
            columns={columns}
            items={products}
            style={{ marginTop: 30, width: "100%" }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
        </EuiFlexItem>
        <EuiFlexItem>
        </EuiFlexItem>
        <EuiFlexItem>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            size="s"
            color="primary"
            iconType="minus"
            width="50px"
            onClick={() => {
              localStorage.setItem("lastname", JSON.stringify([]));
              localStorage.setItem("firstname", JSON.stringify([]));
              setProducts([]);
            }}
          >
            Clear List
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Container>
  );
}
