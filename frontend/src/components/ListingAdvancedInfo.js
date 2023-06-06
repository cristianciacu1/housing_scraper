import ListingBasicInfo from './ListingBasicInfo'
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListingAdvancedInfo({ element, website_names }) {
    return (
        <>
            <ListingBasicInfo element={element} />
            <div id="advanced-info">
                {/* Websites where it can be found */}
                <div className="d-inline">
                    <FontAwesomeIcon icon={faList} className="pe-2 d-inline" /> 
                    {Array.from(new Set(element['publisher_websites'])).map((website, index) => {
                        return (
                            <a href={website} target="_blank" className="d-inline" id="publisher_websites" key={index}>
                                {website_names.get(website)} 
                            </a>
                        )
                    })}
                </div>
            </div>
        </>
    )
}