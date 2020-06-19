import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { commentSchema, commentInitialValues } from '../utils/formikUtil';
import { translate } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { addTopicComment } from '../redux/actions';
import { toast } from 'react-toastify';

export const CommentaryForm = ({ slug }) => {
  const dispatch = useDispatch();
  const { commentLoading, commentAdded } = useSelector(
    ({ comment }) => comment
  );
  useEffect(() => {
    if (commentAdded) {
      toast(translate('commentSuccess'));
    }
  }, [commentAdded]);
  const onSubmitForm = (comment, { resetForm }) => {
    dispatch(addTopicComment(comment, slug));
    if (commentAdded) {
      console.log('Resetting form');
      resetForm();
    }
  };
  return (
    <Formik
      initialValues={commentInitialValues}
      validationSchema={commentSchema}
      onSubmit={onSubmitForm}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <hr />
          <h4 className='text-center text-info'>{translate('leaveComment')}</h4>
          <p className='text-muted'>{translate('notEmailPublish')}</p>
          <Form.Group controlId='validationContent'>
            <Form.Control
              as='textarea'
              rows='3'
              placeholder='Comment'
              name='content'
              value={values.content}
              onChange={handleChange}
              isInvalid={!!errors.content}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.content}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row className='mt-2'>
            <Form.Group as={Col} md='4' controlId='validationNames'>
              <Form.Control
                type='text'
                placeholder='Names'
                name='names'
                value={values.names}
                onChange={handleChange}
                isInvalid={!!errors.names}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.names}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationFormik02'>
              <Form.Control
                type='text'
                placeholder='E-mail'
                name='email'
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationFormikUsername'>
              <Form.Control
                type='text'
                placeholder='Website'
                name='website'
                value={values.website}
                onChange={handleChange}
                isInvalid={!!errors.website}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.website}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button
            variant='primary'
            type='submit'
            disabled={commentLoading || commentAdded}
          >
            {commentLoading ? 'Saving comment,...' : 'Save'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
