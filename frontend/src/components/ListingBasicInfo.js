import { faMoneyBill, faChartArea, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListingBasicInfo({ element }) {
    return (
        <div id="basic_info">
            {/* Price */}
            {element['price_min'] !== element['price_max'] && (
                <p id="price">
                    <FontAwesomeIcon icon={faMoneyBill} className="pe-2" /> 
                    {element['price_min']} - {element['price_max']}
                </p>
            )}
            {element['price_min'] === element['price_max'] && (
                <p id="price">
                    <FontAwesomeIcon icon={faMoneyBill} className="pe-2" />
                    {element['price_min']}
                </p>
            )}
            
            {/* Area */}
            {element['area_min'] !== element['area_max'] && (
                <p id="surface_area" className="pe-3 pb-2">
                    <FontAwesomeIcon icon={faChartArea} className="pe-2" />
                    {element['area_min']} m² - {element['area_max']} m²
                </p>
            )}
            {element['area_min'] === element['area_max'] && (
                <p id="surface_area" className="pe-3 pb-2">
                    <FontAwesomeIcon icon={faChartArea} className="pe-2" /> 
                    {element['area_min']} m²
                </p>
            )}
            
            {/* Number of rooms */}
            {element['no_of_rooms_min'] !== element['no_of_rooms_max'] && (
                <p id="number_of_rooms" className="pe-3 pb-2">
                    <FontAwesomeIcon icon={faPeopleRoof} className="pe-2" />
                    {element['no_of_rooms_min'] === 0 ? "Not available" : element['no_of_rooms_min']} - {element['no_of_rooms_max']} rooms
                </p>
            )}
            {element['no_of_rooms_min'] === element['no_of_rooms_max'] && (
                <p id="number_of_rooms" className="pe-3 pb-2">
                    <FontAwesomeIcon icon={faPeopleRoof} className="pe-2" />
                    {element['no_of_rooms_min'] === 0 ? "Not available" : element['no_of_rooms_min'] === 1 ? `${element['no_of_rooms_min']} room` : `${element['no_of_rooms_min']} rooms`}
                </p>
            )}
        </div>
    )
}