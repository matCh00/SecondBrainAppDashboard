import React, { useState } from 'react';
import './notesListPage.css';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { types } from '../../models/Types';
import List from '../../components/List/List';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { InputText } from 'primereact/inputtext';

function NotesListPage() {

  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('Angular');
  const [searchValue, setSearchValue] = useState<string>('');

  
  useMountEffect(() => {
    types.forEach(t => {
      setItems((i) => [...i, {label: t.value}]);      
    })

    setItems((i) => [...i, {template: search, className: 'ml-5'}]);
  });


  useUnmountEffect(() => {
    setItems([]);
  });


  const search = () => {
    return (
      <InputText onChange={(e) => handleSearch(e.target.value)} placeholder='Find' className='w-full'/>
    )
  }


  const handleChangeIndex = (e: TabMenuTabChangeEvent) => {
    setActiveTab(e.value.label!); 
    setActiveIndex(e.index)
  }

  const handleSearch = (e: string) => {
    setSearchValue(e);
  }
  

  return (
    <div className='p-3'>

      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => handleChangeIndex(e)}/>
     
      <List type={activeTab} searchValue={searchValue} />

    </div>
  )
};

export default NotesListPage;