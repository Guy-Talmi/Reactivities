import { ErrorMessage, Formik } from "formik"
import MyTextInput from "../../app/common/form/MyTextInput"
import { Button, Header, Label } from "semantic-ui-react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../app/stores/store"

const LoginForm = () => {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch(error => {
                    setErrors({ error: 'Invalid email or password' })
                    console.log(error);
                })}>

            {({ handleSubmit, isSubmitting, errors }) => (
                <form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage name='error'
                        render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />

                    <Button
                        loading={isSubmitting}
                        positive
                        content='Login'
                        type='submit'
                        fluid />
                </form>
            )}

        </Formik>
    )
}

export default observer(LoginForm)