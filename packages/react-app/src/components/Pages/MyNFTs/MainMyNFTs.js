import React, { useState, useEffect } from "react";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiFormRow,
  EuiForm,
  EuiFieldNumber,
  EuiText,
  EuiBasicTable,
  EuiFieldSearch,
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
  }));
}

export default function MainMyNFTs() {

  const [data, setData] = useState({ customer: "", product: "", mintAmount: 0 });
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
      name: "product",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "amount",
      name: "amount",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "mintAmount",
      name: "mintAmount",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    }
  ];

  return (
    <Container>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiForm component="form">
            <EuiFormRow>
              <EuiText>Sell</EuiText>
            </EuiFormRow>
            <EuiFormRow label="customer">
              <EuiFieldText
                name="customer"
                value={data.customer}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </EuiFormRow>
            <EuiFormRow label="product">
              <EuiFieldSearch
                name="product"
                value={data.product}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </EuiFormRow>
            <EuiFormRow label="mintAmount">
              <EuiFieldNumber
                name="mintAmount"
                value={data.mintAmount}
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </EuiFormRow>
            <EuiFormRow>
              <EuiButton
                color="primary"
                iconType="minus"
                onClick={() => {
                  const sell = products;
                  sell.map((item) => {
                    if (item.product == data.product) {
                      item.mintAmount = Number(item.mintAmount) + Number(data.mintAmount);
                    }
                  });
                  localStorage.setItem("lastname", JSON.stringify(sell));
                  setProducts(extractDataForTable(sell));
                  console.log(products);
                }}
              >
                Mint
              </EuiButton>
            </EuiFormRow>
          </EuiForm>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiBasicTable
            columns={columns}
            items={products}
            style={{ marginTop: 100 }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Container >
  );
}
