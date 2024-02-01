import { Button, Header, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';

const ActivityForm = () => {
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loading,
        loadActivity,
        loadingInitial
    } = activityStore;

    const { id } = useParams();
    const navigation = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    const handleFormSubmit = (activity: Activity) => {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigation(`/activities/${activity.id}`));
            return;
        }

        // else update activity
        updateActivity(activity).then(() => navigation(`/activities/${activity.id}`));
    }


    if (loadingInitial) {
        return (<LoadingComponent content='Loading activity...' />)
    }

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        className='ui form'
                        onSubmit={handleSubmit}
                        autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea
                            name='description'
                            placeholder='Description'
                            rows={3}
                        />

                        <MySelectInput
                            name='category'
                            placeholder='Category'
                            options={categoryOptions}
                        />

                        {/* <MyTextInput name='date' placeholder='Date' /> */}
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />

                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='city' placeholder='City' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            loading={loading}
                        />
                        <Button
                            floated='right'
                            type='button'
                            content='Cancel'
                            as={Link} to='/activities'
                        />
                    </Form>
                )}
            </Formik>
        </Segment >
    )
}

export default observer(ActivityForm);