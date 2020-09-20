import React, { useEffect } from 'react';
import { AdminPageHeader, CardCounter, Loading } from '../components/common';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboadCount } from '../redux/actions';
import { ActivePosts } from '../components/ActivePosts';

export const Dashboard = ({ history }) => {
  const {
    dashboard: { countLoading, counts },
    oneTopic: { topicUpdated }
  } = useSelector(({ dashboard, oneTopic }) => ({ dashboard, oneTopic }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboadCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicUpdated]);
  return (
    <>
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
    </>
  );
};
