import React from "react";
import { PageHeader } from "antd";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLink,
} from "@elastic/eui";

import Link from "./Link";

export default function Header(props) {
  return (
    <>
      <EuiHeader>
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLink href="/">
              <PageHeader
                title="GENCECH"
                subTitle=""
                style={{ cursor: "pointer" }}
              />
            </EuiHeaderLink>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem style={{ paddingLeft: 15 }}>
            <Link isHeaderLink to="/supply-chain" title="Supply Chain" />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem style={{ paddingLeft: 15 }}>
            <Link isHeaderLink to="/ipfs" title="IPFS" />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem style={{ paddingLeft: 15 }}>
            <Link isHeaderLink to="/mynfts" title="My NFTs" />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem style={{ paddingLeft: 15 }}>
            <Link isHeaderLink to="/manufacturer" title="Manufacturer" />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem style={{ paddingLeft: 15 }}>
            <Link isHeaderLink to="/products" title="Products" />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>{props.children}</EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
}
