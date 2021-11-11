import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Row, Col, Input, Button, Typography, DatePicker } from "antd";
import { EuiFilePicker } from "@elastic/eui";

export default function ManufacturerSample() {
  const { TextArea } = Input;

  const [customer, setCustomer] = useState();
  const [product, setProduct] = useState();
  const [mintAmount, setMintAmount] = useState();
  const [date, setDate] = useState();
  const [serial, setSerial] = useState();
  const [meterials, setMeterials] = useState();
  const [photo, setPhoto] = useState();
  const [sending, setSending] = useState();

  return (
    <div>
      <div
        style={{
          position: "fixed",
          textAlign: "right",
          right: 0,
          top: 0,
          padding: 10,
        }}
      ></div>
      <div style={{ padding: 70, textAlign: "left" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Customer:</Typography>
            <Input
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} xl={12} />
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Product Name:</Typography>
            <Input
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Mint Amount:</Typography>
            <Input
              value={mintAmount}
              onChange={(e) => {
                setMintAmount(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Date of Manufacture:</Typography>
            <DatePicker style={{ width: "100%" }}
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Serial Number:</Typography>
            <Input
              value={serial}
              onChange={(e) => {
                setSerial(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Meterials:</Typography>
            <TextArea
              rows={5}
              value={meterials}
              onChange={(e) => {
                setMeterials(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Typography style={{ marginBottom: "7px" }}>Photo:</Typography>
            <EuiFilePicker
              onChange={(e) => {
                setPhoto(null);
                if (e[0])
                  setPhoto(URL.createObjectURL(e[0]));
              }}
            />
            {/* <input type="file"
              // value={photo}
              onChange={(e) => {
                setPhoto(URL.createObjectURL(e.target.files[0]));
              }}
            /> */}
          </Col>
          <Col xs={24} xl={12} style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "8" }}
              loading={sending}
              size="large"
              shape="round"
              type="primary"
              onClick={() => {
                setSending(true);
                const saved = localStorage.getItem("lastname");
                const initialValue = JSON.parse(saved);
                const products = initialValue || [];
                const productInfo = { "customer": customer, "product": product, "mintAmount": mintAmount, "date": date, "serial": serial };
                products.push(productInfo);
                localStorage.setItem("lastname", JSON.stringify(products));
                console.log("data", products);
                setSending(false);
              }}
            >
              Create New Product
            </Button>
          </Col>
          <Col xs={24} xl={12}>
            <img src={photo} style={{ marginTop: "5px", width: "50%" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
