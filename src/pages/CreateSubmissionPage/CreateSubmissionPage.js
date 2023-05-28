import React from "react";
import Container from "../../components/Container/Container";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import Title from "../../components/Title/Title";

const CreateSubmissionPage = () => {
  return (
    <Container>
      <Title>Create a new financial submission</Title>
      <SubmissionForm />
    </Container>
  );
};

export default CreateSubmissionPage;
