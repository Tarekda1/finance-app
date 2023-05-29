import React, { useContext } from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { SubmissionsContext } from "../../context/SubmissionProvider";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import "./index.css";

const IndexPage = () => {
  const { submissionsState } = useContext(SubmissionsContext);
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Submissions</Title>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>country</th>
            <th>currency</th>
            <th>amount</th>
            <th>description</th>
            <th>project code</th>
          </tr>
        </thead>
        <tbody>
          {submissionsState.length > 0 ? (
            submissionsState.map((submission, index) => {
              return (
                <tr key={`submissions__${index}`}>
                  <th scope="row">{index}</th>
                  <td>{submission.name}</td>
                  <td>{submission.surname}</td>
                  <td>{submission.country}</td>
                  <td>{submission.currency}</td>
                  <td>{submission.amount}</td>
                  <td>{submission.description}</td>
                  <td>{submission.projectCode}</td>
                </tr>
              );
            })
          ) : (
            <tr key={`no__submissions`}>
              <td align="center" colSpan={8}>
                <span style={{ paddingRight: "10px" }}>
                  No submissions yet!
                </span>
                <Button
                  className="no__border_btn"
                  onClick={() => navigate("/createSubmission")}
                >
                  Create Submission
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default IndexPage;
