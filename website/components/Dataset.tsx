import styled from "styled-components";
import { Button, Card, Skeleton } from "../styles/antd";
import { Spacer } from "../styles/responsive";
import { LargeText, Text } from "../styles/typography";

const Dataset = ({ title, url, loading }) => {
  const fileType = url.substr(url.lastIndexOf(".") + 1);

  const downloadDataset = () => {
    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        // @ts-ignore
        const url = window.URL.createObjectURL(blob);
        // @ts-ignore
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.${fileType}`;
        // @ts-ignore
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  if (loading) {
    return (
      <Card
        style={{
          width: "320px",
          padding: "24px",
        }}>
        <div style={{
          display: "flex",
          height: "180px",
          justifyContent: `center`,
          alignItems: `center`,
        }}>
          <Skeleton active />
        </div>
      </Card>
    );
  }

  return (
    <Card style={{
      width: "320px",
      padding: "24px",
    }}>
      <LargeText>{title}</LargeText>
      <Text>{fileType} file</Text>
      <Spacer h="b" />
      <Button
        onClick={downloadDataset}
        size="large" type="primary">Download</Button>
    </Card>
  );
};

export default Dataset;;
