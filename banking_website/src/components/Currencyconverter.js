import React, { useState } from "react";

const Currencyconverter = () => {
  const currencies = {
    "AED": "United Arab Emirates",
    "AFN": "Afghanistan",
    "ALL": "Albania",
    "AMD": "Armenia",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angola",
    "ARS": "Argentina",
    "AUD": "Australia",
    "AWG": "Aruba",
    "AZN": "Azerbaijan",
    "BAM": "Bosnia and Herzegovina",
    "BBD": "Barbados",
    "BDT": "Bangladesh",
    "BGN": "Bulgaria",
    "BHD": "Bahrain",
    "BIF": "Burundi",
    "BMD": "Bermuda",
    "BND": "Brunei",
    "BOB": "Bolivia",
    "BRL": "Brazil",
    "BSD": "Bahamas",
    "BTN": "Bhutan",
    "BWP": "Botswana",
    "BYN": "Belarus",
    "BZD": "Belize",
    "CAD": "Canada",
    "CDF": "Democratic Republic of the Congo",
    "CHF": "Switzerland",
    "CLP": "Chile",
    "CNY": "China",
    "COP": "Colombia",
    "CRC": "Costa Rica",
    "CUC": "Cuba (Convertible)",
    "CUP": "Cuba",
    "CVE": "Cape Verde",
    "CZK": "Czech Republic",
    "DJF": "Djibouti",
    "DKK": "Denmark",
    "DOP": "Dominican Republic",
    "DZD": "Algeria",
    "EGP": "Egypt",
    "ERN": "Eritrea",
    "ETB": "Ethiopia",
    "EUR": "Eurozone",
    "FJD": "Fiji",
    "FKP": "Falkland Islands",
    "FOK": "Faroe Islands",
    "GBP": "United Kingdom",
    "GEL": "Georgia",
    "GGP": "Guernsey",
    "GHS": "Ghana",
    "GIP": "Gibraltar",
    "GMD": "Gambia",
    "GNF": "Guinea",
    "GTQ": "Guatemala",
    "GYD": "Guyana",
    "HKD": "Hong Kong",
    "HNL": "Honduras",
    "HRK": "Croatia",
    "HTG": "Haiti",
    "HUF": "Hungary",
    "IDR": "Indonesia",
    "ILS": "Israel",
    "IMP": "Isle of Man",
    "INR": "India",
    "IQD": "Iraq",
    "IRR": "Iran",
    "ISK": "Iceland",
    "JEP": "Jersey",
    "JMD": "Jamaica",
    "JOD": "Jordan",
    "JPY": "Japan",
    "KES": "Kenya",
    "KGS": "Kyrgyzstan",
    "KHR": "Cambodia",
    "KID": "Kiribati",
    "KMF": "Comoros",
    "KRW": "South Korea",
    "KWD": "Kuwait",
    "KYD": "Cayman Islands",
    "KZT": "Kazakhstan",
    "LAK": "Laos",
    "LBP": "Lebanon",
    "LKR": "Sri Lanka",
    "LRD": "Liberia",
    "LSL": "Lesotho",
    "LYD": "Libya",
    "MAD": "Morocco",
    "MDL": "Moldova",
    "MGA": "Madagascar",
    "MKD": "North Macedonia",
    "MMK": "Myanmar",
    "MNT": "Mongolia",
    "MOP": "Macau",
    "MRU": "Mauritania",
    "MUR": "Mauritius",
    "MVR": "Maldives",
    "MWK": "Malawi",
    "MXN": "Mexico",
    "MYR": "Malaysia",
    "MZN": "Mozambique",
    "NAD": "Namibia",
    "NGN": "Nigeria",
    "NIO": "Nicaragua",
    "NOK": "Norway",
    "NPR": "Nepal",
    "NZD": "New Zealand",
    "OMR": "Oman",
    "PAB": "Panama",
    "PEN": "Peru",
    "PGK": "Papua New Guinea",
    "PHP": "Philippines",
    "PKR": "Pakistan",
    "PLN": "Poland",
    "PYG": "Paraguay",
    "QAR": "Qatar",
    "RON": "Romania",
    "RSD": "Serbia",
    "RUB": "Russia",
    "RWF": "Rwanda",
    "SAR": "Saudi Arabia",
    "SBD": "Solomon Islands",
    "SCR": "Seychelles",
    "SDG": "Sudan",
    "SEK": "Sweden",
    "SGD": "Singapore",
    "SHP": "Saint Helena",
    "SLL": "Sierra Leone",
    "SOS": "Somalia",
    "SRD": "Suriname",
    "SSP": "South Sudan",
    "STN": "Sao Tome and Principe",
    "SYP": "Syria",
    "SZL": "Eswatini",
    "THB": "Thailand",
    "TJS": "Tajikistan",
    "TMT": "Turkmenistan",
    "TND": "Tunisia",
    "TOP": "Tonga",
    "TRY": "Turkey",
    "TTD": "Trinidad and Tobago",
    "TVD": "Tuvalu",
    "TWD": "Taiwan",
    "TZS": "Tanzania",
    "UAH": "Ukraine",
    "UGX": "Uganda",
    "USD": "United States",
    "UYU": "Uruguay",
    "UZS": "Uzbekistan",
    "VES": "Venezuela",
    "VND": "Vietnam",
    "VUV": "Vanuatu",
    "WST": "Samoa",
    "XAF": "Central African CFA Franc",
    "XCD": "Eastern Caribbean Dollar",
    "XOF": "West African CFA Franc",
    "XPF": "CFP Franc",
    "YER": "Yemen",
    "ZAR": "South Africa",
    "ZMW": "Zambia",
    "ZWL": "Zimbabwe"
  };

  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered currencies based on search query
  const filteredCurrencies = Object.keys(currencies).filter(currencyCode =>
    `${currencyCode} ${currencies[currencyCode]}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCurrencyOptions = () => {
    return filteredCurrencies.map((currencyCode) => (
      <li key={currencyCode} style={{ listStyleType: "none" }}>
        <a className="dropdown-item">{currencyCode}</a>
      </li>
    ));
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-around">
            <div className="col-6">
              <p className="fs-5 text fw-normal">Currency Converter</p>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                From{" "}
                <div className="btn-group">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Currency
                  </button>
                  <div className="dropdown-menu" style={{maxHeight:"200px", overflowY:"auto"}}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Currency"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul>{renderCurrencyOptions()}</ul>
                  </div>
                </div>
              </div>
              <div>
                To{" "}
                <div className="btn-group">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Currency
                  </button>
                  <div className="dropdown-menu" style={{maxHeight:"200px", overflowY:"auto"}}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Currency"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul>{renderCurrencyOptions()}</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currencyconverter;
