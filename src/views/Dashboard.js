import React, { useEffect } from 'react';
import { AdminPageHeader, CardCounter, Loading } from '../components/common';
import { useSelector } from 'react-redux';
import { getDashboadCount } from '../redux/actions';
import { ActivePosts } from '../components/ActivePosts';
import { Page } from '../components';

export const Dashboard = ({ history }) => {
  const {
    dashboard: { countLoading, counts },
    topicEdit: { done }
  } = useSelector(({ dashboard, topicEdit }) => ({ dashboard, topicEdit }));
  useEffect(() => {
    getDashboadCount();
  }, [done]);
  return (
    <Page title='Dashboard'>
      <AdminPageHeader
        name='Dashboard'
        btnTitle='Add topic'
        btnAction={() => history.push('/admin/add-topic')}
      />
      <section className='dashboard-counts no-padding-top'>
        <div className='container-fluid'>
          {countLoading ? (
            <Loading />
          ) : (
            <div className='row bg-white has-shadow'>
              <CardCounter
                title='Published'
                color='green'
                count={counts.published}
              />
              <CardCounter
                title='Unpublished'
                color='red'
                count={counts.unPublished}
              />
              <CardCounter title='Audios' color='violet' count={counts.songs} />
              <CardCounter
                title='Videos'
                color='orange'
                count={counts.videos}
              />
            </div>
          )}
        </div>
      </section>
      <section className='updates no-padding-top'>
        <div className='container-fluid'>
          <ActivePosts history={history} />
        </div>
      </section>
    </Page>
  );
};
