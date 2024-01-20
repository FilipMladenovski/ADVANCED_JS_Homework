let allCarsData;

fetch("https://raw.githubusercontent.com/FilipMladenovski/ADVANCED_JS_Homework/main/ADVANCED_JS_Homework/cars.json")
    .then(function (res) {
        return res.json();
    })
    .then(function (body) {
        console.log("BODY", body);
        allCarsData = body;
        displayCarsData(allCarsData);
        populateFilters(body);
    });

function displayCarsData(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = data.map(car => `
            <tr>
                <td>${car.type}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.doors}</td>
                <td>${car.gasType}</td>
                <td>${car.color}</td>
                <td>${car.isNew ? "New" : "Old"}</td>
                <td>${car.horsepower}</td>
            </tr>
        `).join('');
}

function populateFilters(data) {
    const typeFilter = document.getElementById("type-input");
    const brandFilter = document.getElementById("brand-input");
    const gasTypeFilter = document.getElementById("gas-type-input");
    const colorFilter = document.getElementById("color-input");

    const types = [];
    const brands = [];
    const gasTypes = [];
    const colors = [];

    for (let i = 0; i < data.length; i++) {
        let car = data[i];

        if (types.indexOf(car.type) === -1) {
            types.push(car.type);
        }

        if (brands.indexOf(car.brand) === -1) {
            brands.push(car.brand);
        }

        if (gasTypes.indexOf(car.gasType) === -1) {
            gasTypes.push(car.gasType);
        }

        if (colors.indexOf(car.color) === -1) {
            colors.push(car.color);
        }
    }

    types.forEach(function (type) {
        const option = document.createElement("option");
        option.text = type;
        typeFilter.add(option);
    });

    brands.forEach(function (brand) {
        const option = document.createElement("option");
        option.text = brand;
        brandFilter.add(option);
    });

    gasTypes.forEach(function (gasType) {
        const option = document.createElement("option");
        option.text = gasType;
        gasTypeFilter.add(option);
    });

    colors.forEach(function (color) {
        const option = document.createElement("option");
        option.text = color;
        colorFilter.add(option);
    });
}

function applyFilters() {
    let filteredData = allCarsData.slice();
    const typeFilterValue = document.getElementById("type-input").value;
    const brandFilterValue = document.getElementById("brand-input").value;
    const modelFilterValue = document.getElementById("model-input").value.toLowerCase();
    const doorsFilterValue = document.getElementById("doors-input").value;
    const gasTypeFilterValue = document.getElementById("gas-type-input").value;
    const colorFilterValue = document.getElementById("color-input").value.toLowerCase();
    const newOldFilterValue = document.querySelector('input[name="new-old"]:checked') ? document.querySelector('input[name="new-old"]:checked').value : "";
    const horsepowerFilterValue = document.getElementById("horsepower-input").value;

    filteredData = filteredData.filter(function (car) {
        return (!typeFilterValue || car.type === typeFilterValue) &&
            (!brandFilterValue || car.brand === brandFilterValue) &&
            (!modelFilterValue || car.model.toLowerCase().includes(modelFilterValue)) &&
            (!doorsFilterValue || parseInt(car.doors) === parseInt(doorsFilterValue)) &&
            (!gasTypeFilterValue || car.gasType === gasTypeFilterValue) &&
            (!colorFilterValue || car.color.toLowerCase().includes(colorFilterValue)) &&
            (!newOldFilterValue || (newOldFilterValue === "new" && car.isNew) || (newOldFilterValue === "old" && !car.isNew)) &&
            (!horsepowerFilterValue || parseInt(car.horsepower) <= parseInt(horsepowerFilterValue));
    });

    displayCarsData(filteredData);

    if (filteredData.length === 0) {
        alert("No data found for the selected filters.");
    }
}

function resetFilters() {
    document.getElementById("type-input").value = "";
    document.getElementById("brand-input").value = "";
    document.getElementById("model-input").value = "";
    document.getElementById("doors-input").value = "";
    document.getElementById("gas-type-input").value = "";
    document.getElementById("color-input").value = "";
    document.getElementById("new-input").checked = false;
    document.getElementById("old-input").checked = false;
    document.getElementById("horsepower-input").value = "";

    displayCarsData(allCarsData);
}

document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

document.getElementById("horsepower-input").addEventListener("input", function () {
    document.getElementById("horsepower-output").textContent = this.value;
});

