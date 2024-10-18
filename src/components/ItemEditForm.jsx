import React from "react";
import ItemInputForm from "./ItemInputForm";
import CloseIcon from "./CloseIcon";
import SelectUserForm from "./SelectUserForm";

function ItemEditForm({
  isPending,
  itemToEdit,
  handleSave,
  handleClose,
  handleOnChangeEditForm,
  title,
}) {
  return (
    <form title="editItem" className="w-full text-xs shadow-lg">
      <div className="flex flex-col space-y-2 mb-2">
        <div className="text-xl text-center uppercase">{title}</div>
        <div className="flex w-full justify-between pr-4">
          <div></div>
          <CloseIcon onClick={handleClose} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <ItemInputForm
          value={itemToEdit?.idPracownika}
          name="idPracownika"
          label={"Id Pracownika "}
          onChange={handleOnChangeEditForm}
        />
        <SelectUserForm 
        value={itemToEdit?.osobaOdpowiedzialna}
          name="osobaOdpowiedzialna"
          label={"Osoba odpowiedzialna "}
          onChange={handleOnChangeEditForm}/>
        <ItemInputForm
          value={itemToEdit?.osobaOdpowiedzialna}
          name="osobaOdpowiedzialna"
          label={"Osoba odpowiedzialna "}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.nazwa}
          name="nazwa"
          label={"Nazwa"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.lokalizacja}
          name="lokalizacja"
          label={"Lokalizacja"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.producent}
          name="producent"
          label={"Producent"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.model}
          name="model"
          label={"Model"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.sn}
          name="sn"
          label={"Nr seryjny"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.typ}
          name="typ"
          label={"Typ"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.opis}
          name="opis"
          label={"Opis"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.status}
          name="status"
          label={"Status"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.nrInwentarzowyIt}
          name="nrInwentarzowyIt"
          label={"Numer Inwentarzowy"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.os}
          name="os"
          label={"System Operacyjny"}
          onChange={handleOnChangeEditForm}
        />
        <ItemInputForm
          value={itemToEdit?.mpk}
          name="mpk"
          label={"MPK"}
          onChange={handleOnChangeEditForm}
        />
      </div>
      <div className="flex justify-end mr-4">
        <button
          type="submit"
          onClick={handleSave}
          className="mb-4 bg-slate-300 text-sm uppercase bg-transparent p-2 text-gray-900 hover:transition-all hover:bg-gray-200 w-24 rounded-md transition-all"
        >
          {isPending ? "Zapisuje..." : "Zapisz"}
        </button>
      </div>
    </form>
  );
}

export default ItemEditForm;
