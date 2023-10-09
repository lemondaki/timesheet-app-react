import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import styles from './HeaderProject.module.scss';
import classNames from 'classnames/bind';
import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
import { GetAllQuantityProject } from '../../../service/project.api';
import { getFilterStatusAction, getSearchTextAction } from '../../../../../context/ProjectContext/ProjectAction';
import { EFilterStatusNumber } from '../../../../../enum/project.enum';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const HeaderProject = (): JSX.Element => {
  const {
    state: { projectsData }
  } = useAppContext();
  let currentSearch: string = '';
  let filterStatusNumber: number = 0;
  const [quantity, setQuantity] = useState({
    active: { status: EFilterStatusNumber.ACTIVE, quantity: 0 },
    deactive: { status: EFilterStatusNumber.DEACTIVE, quantity: 0 },
    all: { status: EFilterStatusNumber.ALL, quantity: 0 }
  });
  const { dispatch } = useAppContext();
  const dataFilter = [
    {
      value: quantity.active.status,
      label: `Active Project (${quantity.active.quantity})`,
      key: 0
    },
    {
      value: quantity.deactive.status,
      label: `Deactive Project (${quantity.deactive.quantity})`,
      key: 1
    },
    {
      value: quantity.all.status,
      label: `All Project (${quantity.all.quantity})`,
      key: 2
    }
  ];
  const [titleFilter, setTitleFilter] = useState(0);
  const debounce = (func: () => void, delay: number): Function => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  const debounceSearch = debounce(() => {
    dispatch(getSearchTextAction(currentSearch));
  }, 500);

  const debounceFilter = debounce(() => {
    dispatch(getFilterStatusAction(filterStatusNumber));
  }, 300);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    currentSearch = event.target.value;
    debounceSearch();
  };

  const handleFilterProject = (value: { value: string; label: React.ReactNode }): void => {
    filterStatusNumber = +value.value;
    if (+value.value === 0) {
      setTitleFilter(0);
    }
    if (+value.value === 1) {
      setTitleFilter(1);
    }
    if (+value.value === 2) {
      setTitleFilter(2);
    }
    debounceFilter();
  };

  useEffect(() => {
    GetAllQuantityProject()
      .then((response) => {
        const quantityActive: number = response.filter((res) => res.status === EFilterStatusNumber.ACTIVE)[0].quantity;
        const quantityDeactive: number = response.filter((res) => res.status === EFilterStatusNumber.DEACTIVE)[0]
          .quantity;
        const quantityAll = quantityActive + quantityDeactive;
        setQuantity((prevQuantity) => ({
          active: { ...prevQuantity.active, quantity: quantityActive },
          deactive: { ...prevQuantity.deactive, quantity: quantityDeactive },
          all: { ...prevQuantity.all, quantity: quantityAll }
        }));
      })
      .catch(() => toast.error('There are something wrong'));
  }, [projectsData]);

  return (
    <Card title='Manage Project'>
      <div className={cx('card-action', 'header-card-action')}>
        <Link to='create/general'>
          <Button className={cx('btn-create')} size='large' type='primary' icon={<PlusOutlined />}>
            New Project
          </Button>
        </Link>
        <Select
          labelInValue
          size='large'
          value={{ value: '', label: dataFilter[titleFilter].label }}
          className={cx('select-project')}
          onChange={handleFilterProject}
          options={dataFilter}
        />
        <Search
          placeholder='Search by client or project name'
          allowClear
          onChange={onChangeSearch}
          className={cx('search-box')}
        />
      </div>
    </Card>
  );
};

export default React.memo(HeaderProject);
