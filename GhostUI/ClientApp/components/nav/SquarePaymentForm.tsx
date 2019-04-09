import React, { useEffect, useRef, useState, CSSProperties } from 'react';

declare var global: any

const styles = {
    name: {
        verticalAlign: 'top',
        display: 'none',
        margin: 0,
        border: 'none',
        fontSize: "16px",
        fontFamily: "Helvetica Neue",
        padding: "16px",
        color: "#373F4A",
        backgroundColor: "transparent",
        lineHeight: "1.15em",
        placeholderColor: "#000",
        _webkitFontSmoothing: "antialiased",
        _mozOsxFontSmoothing: "grayscale",
    } as CSSProperties,
    leftCenter: {
        float: 'left',
        textAlign: 'center'
    } as CSSProperties,
    blockRight: {
        display: 'block',
        float: 'right'
    } as CSSProperties,
    center: {
        textAlign: 'center'
    } as CSSProperties
};

// Render this in wrapper component that loads the script then renders this component if successful

const SquarePaymentForm: React.FC<{ config: any }> = (props) => {
    let sqPaymentForm = null;

    const [cardBrand, setCardBrand] = useState('');
    const [nonce, setCardNonce] = useState();
    const [googlePay, setGooglePay] = useState(false);
    const [applePay, setApplePay] = useState(false);
    const [masterpass, setMasterpass] = useState(false);

    const config = {
        applicationId: 'sq0idp-rARHLPiahkGtp6mMz2OeCA',
        locationId: 'GMT96A77XABR1',
        inputClass: 'sq-input',
        autoBuild: false,
        inputStyles: [
            {
                fontSize: '16px',
                padding: '16px',
                color: '#373F4A',
                backgroundColor: 'transparent',
                lineHeight: '1.15em',
                placeholderColor: '#000',
                _webkitFontSmoothing: 'antialiased',
                _mozOsxFontSmoothing: 'grayscale'
            }
        ],
        applePay: {
            elementId: 'sq-apple-pay'
        },
        masterpass: {
            elementId: 'sq-masterpass'
        },
        googlePay: {
            elementId: 'sq-google-pay'
        },
        cardNumber: {
            elementId: 'sq-card-number',
            placeholder: '• • • •  • • • •  • • • •  • • • •'
        },
        cvv: {
            elementId: 'sq-cvv',
            placeholder: 'CVV'
        },
        expirationDate: {
            elementId: 'sq-expiration-date',
            placeholder: 'MM/YY'
        },
        postalCode: {
            elementId: 'sq-postal-code',
            placeholder: 'Zip'
        },
        callbacks: {
            methodsSupported: (methods) => {
                if (methods.googlePay) {
                    setGooglePay(methods.googlePay);
                }
                if (methods.applePay) {
                    setApplePay(methods.applePay);
                }
                if (methods.masterpass) {
                    setMasterpass(methods.masterpass);
                }
                return;
            },
            createPaymentRequest: () => {
                return {
                    requestShippingAddress: false,
                    requestBillingInfo: true,
                    currencyCode: 'USD',
                    countryCode: 'US',
                    total: {
                        label: 'MERCHANT NAME',
                        amount: '100',
                        pending: false
                    },
                    lineItems: [
                        {
                            label: 'Subtotal',
                            amount: '100',
                            pending: false
                        }
                    ]
                };
            },
            cardNonceResponseReceived: (errors, nonce, cardData) => {
                if (errors) {
                    // Log errors from nonce generation to the Javascript console
                    console.log('Encountered errors:');
                    errors.forEach(function (error) {
                        console.log('  ' + error.message);
                    });
                    return;
                }
                setCardNonce(nonce);
            },
            unsupportedBrowserDetected: () => {
            },
            inputEventReceived: (inputEvent) => {
                switch (inputEvent.eventType) {
                    case 'focusClassAdded':
                        break;
                    case 'focusClassRemoved':
                        break;
                    case 'errorClassAdded':
                        document.getElementById('error').innerHTML = 'Please fix card information errors before continuing.';
                        break;
                    case 'errorClassRemoved':
                        document.getElementById('error').style.display = 'none';
                        break;
                    case 'cardBrandChanged':
                        const cardBrandVal = (inputEvent.cardBrand !== 'unknown') ? inputEvent.cardBrand : '';
                        setCardBrand(cardBrandVal);
                        break;
                    case 'postalCodeChanged':
                        break;
                    default:
                        break;
                }
            },
            paymentFormLoaded: function () {
                document.getElementById('name').style.display = 'inline-flex';
            }
        }
    };

    const teardown = () => {
        if (sqPaymentForm) {
            sqPaymentForm.destroy();
        }
    };

    const createInstance = (config) => {
        sqPaymentForm = new global.SqPaymentForm(config);
        sqPaymentForm.build();
    };

    useEffect(() => {
        createInstance(props.config);

        return () => {
            teardown();
        };
    }, []);

    return (
        <div className='container'>
            <div id='form-container'>
                <div id='sq-walletbox'>
                    <button style={{ display: applePay ? 'inherit' : 'none' }} className='wallet-button' id='sq-apple-pay'></button>
                    <button style={{ display: masterpass ? 'block' : 'none' }} className='wallet-button' id='sq-masterpass'></button>
                    <button style={{ display: googlePay ? 'inherit' : 'none' }} className='wallet-button' id='sq-google-pay'></button>
                    <hr />
                </div>
                <div id='sq-ccbox'>
                    <p>
                        <span style={styles.leftCenter}>Enter Card Info Below </span>
                        <span style={styles.blockRight}>
                            {cardBrand.toUpperCase()}
                        </span>
                    </p>
                    <div id='cc-field-wrapper'>
                        <div id='sq-card-number'></div>
                        <input type='hidden' id='card-nonce' name='nonce' />
                        <div id='sq-expiration-date'></div>
                        <div id='sq-cvv'></div>
                    </div>
                    <input id='name' style={styles.name} type='text' placeholder='Name' />
                    <div id='sq-postal-code'></div>
                </div>
                <button className='button-credit-card' onClick={() => { sqPaymentForm.requestCardNonce(); }}>Pay</button>
            </div>
            <p style={styles.center} id='error'></p>
        </div>
    );
};

export default SquarePaymentForm;