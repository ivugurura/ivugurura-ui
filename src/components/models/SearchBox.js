import React, { useState, useEffect } from "react";
import { Modal, Form, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { searchQuery } from "../../redux/actions";
import { Loading } from "../common";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SearchBox = ({ show, onHide }) => {
  const { t } = useTranslation();
  const [searchVal, setSearchVal] = useState("");
  const { searching, finished, results } = useSelector(({ search }) => search);
  useEffect(() => {
    if (searchVal) {
      searchQuery(searchVal);
    }
  }, [searchVal]);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("app:searchTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          value={searchVal}
          autoFocus={true}
          placeholder={t("app:searchPHolder")}
          onChange={({ target }) => setSearchVal(target.value)}
        />
        <div>
          {searching ? (
            <Loading />
          ) : finished ? (
            <>
              <div>
                <hr />
                {results.categories.length
                  ? results.categories.map((category, categoryIndex) => (
                      <Card.Body key={categoryIndex}>
                        <Link
                          to={`/topics/categories/${category.slug}`}
                          onClick={onHide}
                        >
                          <h6>{category.name}</h6>
                        </Link>
                      </Card.Body>
                    ))
                  : null}
              </div>
              <div>
                <hr />
                {results.topics.length
                  ? results.topics.map((topic, topicIndex) => (
                      <Link
                        key={topicIndex}
                        to={`/topics/${topic.slug}`}
                        onClick={onHide}
                      >
                        <Card.Body>
                          <h6>{topic.title}</h6>
                          <p>{topic.description}</p>
                        </Card.Body>
                      </Link>
                    ))
                  : null}
              </div>
            </>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
};
