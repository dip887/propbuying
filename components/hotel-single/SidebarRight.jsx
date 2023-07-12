import FilterBox from '../../components/hotel-single/filter-box';
import EnquiryNowForm from '../modals/EnquiryNowForm';

const SidebarRight = ({
	developerLogo,
	developerName,
	propertyName,
	email,
	setEmail,
	setName,
	name,
	handlePhoneNumberChange,
	handleSubmit,
	numberError,
	phoneNumber,
	setPhoneNumber,
}) => {
	return (
		<div className={`col-xl-4 mb-40`}>
			<div className={`lg:ml-0 sidebarEn`}>
				<div className={`px-30 py-30 border-light rounded-4 shadow-4`}>
					<EnquiryNowForm
						developerLogo={developerLogo}
						developerName={developerName}
						propertyName={propertyName}
						email={email}
						setEmail={setEmail}
						setName={setName}
						handlePhoneNumberChange={handlePhoneNumberChange}
						name={name}
						handleSubmit={handleSubmit}
						numberError={numberError}
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
					/>
				</div>
				{/* End px-30 FilterBox */}
			</div>
		</div>
	);
};

export default SidebarRight;
