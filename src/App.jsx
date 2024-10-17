import axios from "axios";
import "./App.css";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/Header";

import ItemEditForm from "./components/ItemEditForm";
import SearchInput from "./components/SearchInput";
import Table from "./components/Table";

function App() {
  const url = "http://localhost:5001/items";
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [itemToEdit, setItemToEdit] = useState({});

  const getInwentaryzacja = async (search, limit, currentPage) => {
    const params = `?search=${search}&limit=${limit}&currentPage=${currentPage}`;
    try {
      const response = await axios.get(`${url}${params}`);
      return response.data;
    } catch {
      throw Error("Bład");
    }
  };

  const deleteItemFn = async (id) => {
    const params = `?id=${id}`;
    const response = await axios.delete(`${url}${params}`);
    return response.data;
  };
  const editItemFn = async (itemToEdit) => {
    const response = await axios({
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      url: url,
      data: {...itemToEdit},
    });
    return response.data;
  };
  const addItemFn = async (itemToEdit) => {
    const response = await axios({
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      url: url,
      data: {...itemToEdit},
    });
    return response.data;
  };
  const { mutate: deleteItemMutate, isPending: isPendingDelete } = useMutation({
    mutationKey: ["items"],
    mutationFn: (id) => deleteItemFn(id),
    onMutate: (id) => {
      alert(`Czy napewno usunac ${id}`);
    },
    onSuccess: (data) => {
      const newData = [...items.data].filter((item) => item.id !== data.id);
      queryClient.setQueryData(
        ["items",{id:data?.id}],
        newData
      );
      setSearch("")
      queryClient.refetchQueries()
    },
  });
  const { mutate: editMutate, isPending: isPendingEdit } = useMutation({
    mutationKey: ["items"],
    mutationFn: () => editItemFn(itemToEdit),
    onMutate: (itemToEdit) => {
      confirm(`Czy napewno edytować ${itemToEdit.id}`);
    },
    onSuccess: (changedItem,variables) => {
      console.log(items.data);
      const indexChangedItem=Array.from(items.data).findIndex(item=>item.id===changedItem.id);
      const newData=[...items.data]
      newData.splice(indexChangedItem,1,changedItem);
      queryClient.setQueryData( ["items",{id:variables?.id}],newData);
      queryClient.refetchQueries()
    },
  });
  const { mutate: addMutate, isPending: isPendingAdd } = useMutation({
    mutationKey: ["items"],
    mutationFn: (itemToEdit) => addItemFn(itemToEdit),
    onMutate: (itemToEdit) => {
      confirm(`Czy napewno dodać ${itemToEdit?.nazwa}`);
    },
    onSuccess: (changedItem) => {
      const newData=[...items.data,changedItem]
      queryClient.setQueryData( ["items",{id:variables?.id}],newData);
      queryClient.refetchQueries()
    },
  });

 

  const { data: items, isPending } = useQuery({
    queryKey: ["items", search, currentPage, limit, id],
    queryFn: () => getInwentaryzacja(search, limit, currentPage),
  });

  const handleEdit = (id) => {
    let itemEdit = [...items?.data].filter((item) => item.id === id)[0];
    setId(id)
    setShowEditForm(!showEditForm);
    setShowTable(false);
    setItemToEdit(itemEdit);
  };
  const handleAddItem = () => {
    setItemToEdit({});
    setShowEditForm(false);
    setShowTable(false);
    setShowAddForm(true);
  };
  const handleOnChangeEditForm = (e) => {
    console.log({[e.target.name]:e.target.value});
  setItemToEdit(prevItem=>({...prevItem,[e.target.name]:e.target.value}))
  };

  const handleDelete = (id) => {
    deleteItemMutate(id);
  };

  const handleSearchItem = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };
  const handleClose = () => {
    setShowEditForm(false);
    setShowAddForm(false);
    setShowTable(true);
  };
  const handleAddSave = (e) => {
    e.preventDefault();
    addMutate(itemToEdit);
    setShowEditForm(false)
    setShowAddForm(false)
    setShowTable(true)
  };
  const handleEditSave = (e) => {
    e.preventDefault();
    editMutate(itemToEdit);
    setShowEditForm(false)
    setShowAddForm(false)
    setShowTable(true)
  };

  const renderFunction=()=>{
    let render
    if(showAddForm){
      render=<ItemEditForm
            title="Dodaj sprzęt"
            itemToEdit={itemToEdit}
            handleSave={handleAddSave}
            handleClose={handleClose}
            handleOnChangeEditForm={handleOnChangeEditForm}
        />   
      
    }
    if(showEditForm){
      render=<ItemEditForm
      title="Edytuj"
      itemToEdit={itemToEdit}
      handleSave={handleEditSave}
      handleClose={handleClose}
      handleOnChangeEditForm={handleOnChangeEditForm}
    />

    }
    if(showTable){
    render=<>
    <div className="flex flex-col gap-2 justify-center   md:flex-row xl:flex-row">
    <div className="flex float-start ">
    <SearchInput handleSearchItem={handleSearchItem} />
    </div>
    <div className="flex float-right">
    <button onClick={handleAddItem} className="bg-sky-400 p-2 hover:transition-colors md:w-64 xl:w-64 hover:bg-sky-300 w-full rounded-md">Dodaj sprzęt</button>
    </div>
    </div>
    <Table
      items={items}
      isPending={isPending || isPendingAdd || isPendingDelete || isPendingEdit}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      limit={limit}
      setLimit={setLimit}
    />
    </>
    }
    return render
  }
  const render=renderFunction();
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 items-center ">
        {render}
      </div>
    </>
  );
}

export default App;
