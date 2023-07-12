import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header2 from "../components/header/header-2";
import Footer7 from "../components/footer/footer-7";
import Seo from "../components/common/Seo";
import { AgGridReact } from "ag-grid-react";
import { sanityClient } from "../clients/sanityClient";
import { getPropertiesData } from "../utils/getPropertiesData";

const AllProperties = ({ data }) => {
  const [query, setQuery] = useState("");
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "projectName",
      headerName: "Project Name",
      checkboxSelection: true,
      filter: "agTextColumnFilter",
    },
    { field: "location", headerName: "Location", filter: "agTextColumnFilter" },
    { field: "unit", headerName: "Unit", filter: "agTextColumnFilter" },
    {
      field: "sqft",
      headerName: "SQFT",
      filter: "agNumberColumnFilter",
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "emi",
      headerName: "EMI",
      filter: "agTextColumnFilter",
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "price",
      headerName: "Price",
      filter: "agTextColumnFilter",
      sortable: true,
      unSortIcon: true,
    },
  ]);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      floatingFilter: true,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    };
  }, []);

  const propertiesData = useCallback(getPropertiesData(data), [data]);

  useEffect(() => {
    if (propertiesData.length > 0) {
      setRowData(propertiesData);
    }
  });

  return (
    <div onClick={() => setQuery("")}>
      <Seo pageTitle="All Properties" />
      {/* End Page Title */}

      <Header2 query={query} setQuery={setQuery} />
      {/* End location top bar section */}

      <section>
        <div className="container table-container">
          <div className="ag-theme-alpine" style={{ width: "100%" }}>
            <AgGridReact
              animateRows={true}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              onSelectionChanged={onSelectionChanged}
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </section>

      <Footer7 />
      {/* End Footer */}
    </div>
  );
};

export default AllProperties;

export async function getServerSideProps() {
  const data = await sanityClient.fetch(`
		*[_type=="property"]{
  	"id": _id,
  	propertyName,
  	"location": locality->localityName,
  	configurations,
  	"slug": slug.current,
}  
	`);

  return {
    props: {
      data,
    },
  };
}
