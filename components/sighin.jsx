import { Button, Card, Col, Input, Row, Spacer, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Row justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={12} md={6}>
        <Card hoverable css={{ mw: "400px", p: "$6" }}>
          <Text h3>Sign In</Text>

          <Button
            auto
            onClick={() => signIn("google")}
            css={{ width: "100%", marginBottom: "10px" }}
          >
            Sign in with Google
          </Button>

          <Spacer y={1} />

          <Button
            auto
            onClick={() => signIn("guest")}
            css={{ width: "100%" }}
          >
            Continue as Guest
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
