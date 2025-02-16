import React, { useState, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";

const Currencyconverter = () => {
  const { showAlert, mode } = useContext(profileContext);

  const currencies = {
    AED: "United Arab Emirates",
    AFN: "Afghanistan",
    ALL: "Albania",
    AMD: "Armenia",
    ANG: "Netherlands Antillean Guilder",
    AOA: "Angola",
    ARS: "Argentina",
    AUD: "Australia",
    AWG: "Aruba",
    AZN: "Azerbaijan",
    BAM: "Bosnia and Herzegovina",
    BBD: "Barbados",
    BDT: "Bangladesh",
    BGN: "Bulgaria",
    BHD: "Bahrain",
    BIF: "Burundi",
    BMD: "Bermuda",
    BND: "Brunei",
    BOB: "Bolivia",
    BRL: "Brazil",
    BSD: "Bahamas",
    BTN: "Bhutan",
    BWP: "Botswana",
    BYN: "Belarus",
    BZD: "Belize",
    CAD: "Canada",
    CDF: "Democratic Republic of the Congo",
    CHF: "Switzerland",
    CLP: "Chile",
    CNY: "China",
    COP: "Colombia",
    CRC: "Costa Rica",
    CUC: "Cuba (Convertible)",
    CUP: "Cuba",
    CVE: "Cape Verde",
    CZK: "Czech Republic",
    DJF: "Djibouti",
    DKK: "Denmark",
    DOP: "Dominican Republic",
    DZD: "Algeria",
    EGP: "Egypt",
    ERN: "Eritrea",
    ETB: "Ethiopia",
    EUR: "Eurozone",
    FJD: "Fiji",
    FKP: "Falkland Islands",
    FOK: "Faroe Islands",
    GBP: "United Kingdom",
    GEL: "Georgia",
    GGP: "Guernsey",
    GHS: "Ghana",
    GIP: "Gibraltar",
    GMD: "Gambia",
    GNF: "Guinea",
    GTQ: "Guatemala",
    GYD: "Guyana",
    HKD: "Hong Kong",
    HNL: "Honduras",
    HRK: "Croatia",
    HTG: "Haiti",
    HUF: "Hungary",
    IDR: "Indonesia",
    ILS: "Israel",
    IMP: "Isle of Man",
    INR: "India",
    IQD: "Iraq",
    IRR: "Iran",
    ISK: "Iceland",
    JEP: "Jersey",
    JMD: "Jamaica",
    JOD: "Jordan",
    JPY: "Japan",
    KES: "Kenya",
    KGS: "Kyrgyzstan",
    KHR: "Cambodia",
    KID: "Kiribati",
    KMF: "Comoros",
    KRW: "South Korea",
    KWD: "Kuwait",
    KYD: "Cayman Islands",
    KZT: "Kazakhstan",
    LAK: "Laos",
    LBP: "Lebanon",
    LKR: "Sri Lanka",
    LRD: "Liberia",
    LSL: "Lesotho",
    LYD: "Libya",
    MAD: "Morocco",
    MDL: "Moldova",
    MGA: "Madagascar",
    MKD: "North Macedonia",
    MMK: "Myanmar",
    MNT: "Mongolia",
    MOP: "Macau",
    MRU: "Mauritania",
    MUR: "Mauritius",
    MVR: "Maldives",
    MWK: "Malawi",
    MXN: "Mexico",
    MYR: "Malaysia",
    MZN: "Mozambique",
    NAD: "Namibia",
    NGN: "Nigeria",
    NIO: "Nicaragua",
    NOK: "Norway",
    NPR: "Nepal",
    NZD: "New Zealand",
    OMR: "Oman",
    PAB: "Panama",
    PEN: "Peru",
    PGK: "Papua New Guinea",
    PHP: "Philippines",
    PKR: "Pakistan",
    PLN: "Poland",
    PYG: "Paraguay",
    QAR: "Qatar",
    RON: "Romania",
    RSD: "Serbia",
    RUB: "Russia",
    RWF: "Rwanda",
    SAR: "Saudi Arabia",
    SBD: "Solomon Islands",
    SCR: "Seychelles",
    SDG: "Sudan",
    SEK: "Sweden",
    SGD: "Singapore",
    SHP: "Saint Helena",
    SLL: "Sierra Leone",
    SOS: "Somalia",
    SRD: "Suriname",
    SSP: "South Sudan",
    STN: "Sao Tome and Principe",
    SYP: "Syria",
    SZL: "Eswatini",
    THB: "Thailand",
    TJS: "Tajikistan",
    TMT: "Turkmenistan",
    TND: "Tunisia",
    TOP: "Tonga",
    TRY: "Turkey",
    TTD: "Trinidad and Tobago",
    TVD: "Tuvalu",
    TWD: "Taiwan",
    TZS: "Tanzania",
    UAH: "Ukraine",
    UGX: "Uganda",
    USD: "United States",
    UYU: "Uruguay",
    UZS: "Uzbekistan",
    VES: "Venezuela",
    VND: "Vietnam",
    VUV: "Vanuatu",
    WST: "Samoa",
    XAF: "Central African CFA Franc",
    XCD: "Eastern Caribbean Dollar",
    XOF: "West African CFA Franc",
    XPF: "CFP Franc",
    YER: "Yemen",
    ZAR: "South Africa",
    ZMW: "Zambia",
    ZWL: "Zimbabwe",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [outputCurrency, setOutputCurrency] = useState(0);
  const [inputCur, setInputCur] = useState(0);

  const handleCurrencyChange = (e) => {
    setInputCur(e.target.value);
  };

  // Filtered currencies based on search query
  const filteredCurrencies = Object.keys(currencies).filter((currencyCode) =>
    `${currencyCode} ${currencies[currencyCode]}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderCurrencyOptions = (currencyType) => {
    return (
      <>
        {/* Deselect option */}
        <li onClick={() => handleCurrencySelect(currencyType, "")}>
          <a className="dropdown-item text-danger">Deselect</a>
        </li>
        {/* Currency options */}
        {filteredCurrencies.map((currencyCode) => (
          <li
            key={currencyCode}
            onClick={() => handleCurrencySelect(currencyType, currencyCode)}
          >
            <a className="dropdown-item">{currencyCode}</a>
          </li>
        ))}
      </>
    );
  };

  const handleCurrencySelect = (currencyType, currencyCode) => {
    if (currencyType === "from") {
      setFromCurrency(currencyCode);
    } else if (currencyType === "to") {
      setToCurrency(currencyCode);
    }
  };

  const convertCurrency = async (e) => {
    if (!fromCurrency || !toCurrency) {
      showAlert("Please select both currencies.","danger");
      return;
    }

    const inputAmount = parseFloat(inputCur);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      showAlert("Please enter a valid amount.","danger");
      return;
    }

    try {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10);
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/${fromCurrency.toLowerCase()}.json`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch currency data.");
      }

      const json = await response.json();
      const currencyKey = Object.keys(json)[1];
      const currencyData = json[currencyKey];

      const multiplicationFactor = currencyData[toCurrency.toLowerCase()];
      if (!multiplicationFactor) {
        showAlert("Conversion rate not available for the selected currencies.","danger");
        return;
      }

      setOutputCurrency(Number((inputAmount * multiplicationFactor).toFixed(4)));

    } catch (error) {
      console.error("Error during currency conversion:", error);
      showAlert("Something went wrong. Please try again.","danger");
    }
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <div className={`card mb-4 ${
              mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
            }`}>
        <div className="card-body">
          <div className="row justify-content-around">
            <div className="col-6">
              <p className="fs-5 text fw-normal">Currency Converter</p>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                From{" "}
                <div className="btn-group mx-3">
                  <button
                    className="btn btn-outline-primary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {fromCurrency ? `${fromCurrency}` : "Select Currency"}
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Currency"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul style={{ listStyleType: "none" }}>
                      {renderCurrencyOptions("from")}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                To{" "}
                <div className="btn-group mx-3">
                  <button
                    className="btn btn-outline-primary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {toCurrency ? `${toCurrency}` : "Select Currency"}
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Currency"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul style={{ listStyleType: "none" }}>
                      {renderCurrencyOptions("to")}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <input
                type="text"
                className="form-control mx-3"
                id="exampleFormControlInput1"
                placeholder="Enter Amount..."
                name="inputCur"
                value={inputCur}
                onChange={handleCurrencyChange}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={convertCurrency}
              >
                Convert
              </button>{" "}
            </div>
          </div>
          <p className="fs-5 fw-light">Converted currency: <strong>{toCurrency}{" "}{outputCurrency}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Currencyconverter;
