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
    date: item.date,
    serial: item.serial,
  }));
}

function extractDataForTable1(data) {
  if (!data || !data.length) {
    return [];
  }

  return data.map((item) => ({
    customer: item.customer,
    product: item.product,
    mintAmount: item.mintAmount,
  }));
}

export default function MainMyNFTs() {

  const [data, setData] = useState({ customer: "", product: "", mintAmount: 0 });
  const [products, setProducts] = useState([]);
  const [sends, setSends] = useState([]);
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("lastname");
    const initialValue = JSON.parse(saved);
    const events = initialValue;
    setProducts(extractDataForTable(events));

    const saved1 = localStorage.getItem("firstname");
    const initialValue1 = JSON.parse(saved1);
    const events1 = initialValue1;
    setSends(extractDataForTable1(events1));

    var output = [];
    events1.forEach(function (item) {
      var existing = output.filter(function (v, i) {
        return v.customer == item.customer && v.product == item.product;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].mintAmount = Number(output[existingIndex].mintAmount) + Number(item.mintAmount);
      } else {
        if (typeof item.product == 'string')
          output.push(item);
      }
    });
    setNFTs(extractDataForTable1(output));
  }, []);

  const columns = [
    {
      field: "customer",
      name: "customer",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "product",
      name: "product",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    },
    {
      field: "mintAmount",
      name: "NFT",
      truncateText: false,
      render: (item) => <span>{item}</span>,
    }
  ];

  return (
    <Container>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            style={{ marginTop: 80 }}>
            <EuiText>NFT</EuiText>
          </EuiFormRow>
          <EuiBasicTable
            columns={columns}
            items={nfts}
            style={{ marginTop: 20 }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiForm component="form">
            <EuiFormRow
              style={{ marginTop: 50 }}>
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
            <EuiFormRow label="amount">
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

                  const sell1 = sends;
                  const sendInfo = { "customer": data.customer, "product": data.product, "mintAmount": data.mintAmount };
                  sell1.push(sendInfo);
                  localStorage.setItem("firstname", JSON.stringify(sell1));
                  setSends(extractDataForTable1(sell1));
                  console.log(sell1);

                  var output = [];
                  sell1.forEach(function (item) {
                    var existing = output.filter(function (v, i) {
                      return v.customer == item.customer && v.product == item.product;
                    });
                    if (existing.length) {
                      var existingIndex = output.indexOf(existing[0]);
                      output[existingIndex].mintAmount = Number(output[existingIndex].mintAmount) + Number(item.mintAmount);
                    } else {
                      if (typeof item.product == 'string')
                        output.push(item);
                    }
                  });

                  setNFTs(extractDataForTable1(output));
                }}
              >
                Mint
              </EuiButton>
            </EuiFormRow>
          </EuiForm>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiText>Sent</EuiText>
          </EuiFormRow>
          <EuiBasicTable
            columns={columns}
            items={sends}
            style={{ marginTop: 30 }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Container >
  );
}
