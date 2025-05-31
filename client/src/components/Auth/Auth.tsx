import { Box, Button, Paper, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { z as zov } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuthStore } from "../../stores/auth-store.ts";
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

const validationSchema = zov.object({
    nickname: zov.string({ required_error: "Введи ник, чмо" })
        .max(20, { message: "Ник короче 20, долбоеб" }),
});

export default function Auth() {
    return (
        <Box sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        }}>
            <Paper sx={{ padding: '50px', borderRadius: 3 }}>
                <Formik
                    initialValues={{ nickname: "хуесос" }}
                    validationSchema={toFormikValidationSchema(validationSchema)}
                    onSubmit={({ nickname }) => useAuthStore.getState().auth(nickname)}
                >
                    {({ errors, touched, isValid, values }) => (
                        <Form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Field
                                as={TextField}
                                name="nickname"
                                label="Твой сраный ник"
                                variant="outlined"
                                value={values.nickname}
                                error={touched.nickname && !!errors.nickname}
                                helperText={touched.nickname && errors.nickname}
                            />
                            <Button disabled={!isValid} variant="outlined" type="submit" sx={{ mt: 3 }}>
                                Валить в чат, сука
                            </Button>
                        </Form>
                    )}
                </Formik>

            </Paper>
            <Paper style={{
                position: 'absolute',
                bottom: '25px',
                display: 'flex',
                justifyContent: 'center',
                // width: '75%',
                gap: '25px',
                padding: '20px',
                borderRadius: '40px'
            }}>
                <a href='https://t.me/+ysAvqT3Wo6VhYmU6' style={{height: '55px'}} target='_blank'>
                    <TelegramIcon sx={{
                        width: '55px',
                        height: '55px',
                        color: 'white'
                    }} />
                </a>
                <a href='https://github.com/wzhxycl0/verydirtchat' style={{height: '55px'}} target='_blank' >
                    <GitHubIcon sx={{
                        width: '55px',
                        height: '55px',
                        color: 'white'
                    }} />
                </a>
            </Paper>
        </Box>
    );
}