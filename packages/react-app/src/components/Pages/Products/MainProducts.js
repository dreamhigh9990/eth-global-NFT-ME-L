import React, { useState, useEffect } from "react";
import useEventListener from "../../../hooks/EventListener";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiBasicTable,
  EuiButton,
  EuiFormRow,
} from "@elastic/eui";

import Container from "../../Styled/Container";
import { useHistory } from "react-router-dom";

function extractDataForTable(data) {
  if (!data || !data.length) {
    return [];
  }

  return data.map((item) => ({
    customer: item.customer,
    product: item.product,
    mintAmount: item.mintAmount,
    date: item.date,
    serial: item.serial,
  }));
}

export default function MainProducts(props) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("lastname");
    const initialValue = JSON.parse(saved);
    const events = initialValue;
    setProducts(extractDataForTable(events));
  }, []);

  const columns = [
    {
      field: "customer",
      name: "Customer",
      sortable: true,
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "product",
      name: "Product",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "mintAmount",
      name: "Mint Amount",
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
