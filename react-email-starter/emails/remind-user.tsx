import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";

export const SingUpReminderEmail = () => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>You forgot to create an account in Yum Send</Preview>
                <Container style={container}>
                    <Section style={sectionsBorders}>
                        <Row>
                            <Column style={sectionBorder} />
                            <Column style={sectionCenter} />
                            <Column style={sectionBorder} />
                        </Row>
                    </Section>
                    <Section style={content}>
                        <Text style={paragraph}>Hi,</Text>
                        <Text style={paragraph}>
                            You have created a recipe in Yum Send. Please create
                            an account to save your recipe!
                        </Text>
                        <Text style={paragraph}>
                            <Link href="#" style={link}>
                                Create an account
                            </Link>{" "}
                        </Text>

                        <Text style={paragraph}>
                            Have questions? Please contact{" "}
                            <Link href="#" style={link}>
                                Yum Send Support
                            </Link>
                        </Text>
                        <Text style={paragraph}>
                            Thanks,
                            <br />
                            Yum Send Support Team
                        </Text>
                    </Section>
                </Container>

                <Section style={footer}>
                    <Row>
                        <Text style={{ textAlign: "center", color: "#706a7b" }}>
                            © 2025 Yum Send, All Rights Reserved <br />
                        </Text>
                    </Row>
                </Section>
            </Body>
        </Html>
    );
};

export default SingUpReminderEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
    backgroundColor: "#efeef1",
    fontFamily,
};

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
};

const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
};

const footer = {
    maxWidth: "580px",
    margin: "0 auto",
};

const content = {
    padding: "5px 20px 10px 20px",
};

const logo = {
    padding: 30,
};

const logoImg = {
    margin: "0 auto",
};

const sectionsBorders = {
    width: "100%",
};

const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
};

const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
};

const link = {
    textDecoration: "underline",
};
