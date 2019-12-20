import React from 'react';
import MaterialTable from "material-table";
import { getData, sendData } from '../../utils/dataUtils';
import { options, title } from './settings';
import { localization } from './localization';
import { Button } from '@material-ui/core';

async function fetch() {
  return await getData({
    endpoint: 'http://localhost:8080/NCUIM-SA-TOMCAT-DEV/api/v1/user/all',
    withAuth: true
  });
}

export default function({ toggler, setter }) {
  return (
    <MaterialTable
      columns={[
        { title: "使用者名稱", field: "username" },
        { title: "真實姓名", field: "name" },
        { title: "電子郵件", field: "email" },
        { title: "電話號碼", field: "phone" },
        { title: "員工職等", field: "rank.rankName" },
        {
          title: "員工在職狀態",
          field: "dismissed",
          type: 'numeric',
          editable: 'never',
          render: rowData => {
            if (rowData) {
              return (
                rowData.dismissed ?
                  <Button variant="contained" color="secondary">離職</Button> :
                  <Button variant="contained" color="primary">在職</Button>
              );
            }
          }
        },
        {
          title: "修改密碼",
          field: "",
          render: rowData =>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                toggler();
                setter({
                  name: rowData.name,
                  id: rowData.uid
                })
              }}
            >
              修改密碼
            </Button>
        }
      ]}
      options={options}
      data={
        query => new Promise((resolve, reject) => {
          fetch()
            .then((source) => {
              resolve({
                data: source.data.data,
                page: 0,
                totalCount: source.data.data.length,
              })
            })
        })
      }
      title={title}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              sendData({
                endpoint: `/user/add`,
                method: 'post',
                data: {
                  username: newData.username,
                  password: Math.random().toString(36).substring(10),
                  name: newData.name,
                  email: newData.email,
                  phone: newData.phone,
                  rank: 2,
                },
                withAuth: true
              }).then(
                fetch()
                  .then((source) => {
                    resolve({
                      data: source.data.data,
                      page: 0,
                      totalCount: source.data.data.length,
                    })
                  })
              )
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              sendData({
                endpoint: `/user/${oldData.uid}`,
                method: 'patch',
                data: {
                  username: newData.username,
                  name: newData.name,
                  email: newData.email,
                  phone: newData.phone,
                  rank: newData.rank.rankID,
                },
                withAuth: true
              }).then(
                fetch()
                  .then((source) => {
                    resolve({
                      data: source.data.data,
                      page: 0,
                      totalCount: source.data.data.length,
                    })
                  })
              )
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              sendData({
                endpoint: `/user/${oldData.uid}`,
                method: 'delete',
                withAuth: true
              }).then(
                fetch()
                  .then((source) => {
                    resolve({
                      data: source.data.data,
                      page: 0,
                      totalCount: source.data.data.length,
                    })
                  })
              )
            }, 1000)
          }),
      }}
      localization={localization}
    />
  );
}