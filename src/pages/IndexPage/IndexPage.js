import React, { useContext } from "react";
import { Table } from "reactstrap";
import { CountryCurrencyContext } from "../../context/CountryLanguageProvider";

const IndexPage = () => {
  // const { countries, currencies, loadingCountry, loadingCurrency } = useContext(
  //   CountryCurrencyContext
  // );
  return (
    <div className="m-2 container-lg">
      <h1>Financial Submissions</h1>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default IndexPage;
