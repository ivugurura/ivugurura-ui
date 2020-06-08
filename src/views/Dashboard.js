import React, { useEffect } from 'react';
import { AdminPageHeader, CardCounter, Loading } from '../components/common';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboadCount } from '../redux/actions';
import { ActivePosts } from '../components/ActivePosts';
import { DraftPosts } from '../components/DraftPosts';

export const Dashboard = ({ history }) => {
  const { countLoading, counts } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboadCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDashboadCount]);
  return (
    <>
      <AdminPageHeader
        name='Dashboard'
        btnTitle='Add topic'
        btnAction={() => history.push('/admin/add-topic')}
      />
      <section class='dashboard-counts no-padding-bottom'>
        <div class='container-fluid'>
          {countLoading ? (
            <Loading />
          ) : (
            <div class='row bg-white has-shadow'>
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
          <div className='row'>
            <div className='col-lg-6'>
              <ActivePosts history={history} />
            </div>
            <div className='col-lg-6'>
              <DraftPosts history={history} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
