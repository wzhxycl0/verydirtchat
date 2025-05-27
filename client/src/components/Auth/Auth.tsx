import { Box, Button, Paper, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { z as zov } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuthStore } from "../../stores/auth-store.ts";

const validationSchema = zov.object({
    nickname: zov.string({ required_error: "Введи ник, чмо" })
        .max(20, { message: "Ник короче 20, долбоеб" }),
});

export default function Auth() {
    return (
        <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Paper sx={{ p: 6, borderRadius: 3 }}>
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
        </Box>
    );
}