import Button from "../../../../commonComponents/Button";
import {
  handleChange,
  getValue,
  removeContact,
  addContact,
} from "../../../../utils/formUtils";
const ItemInfoContact = ({ property, setProperty }) => {
  if (!property) {
    return null;
  }

  const contactList = property.extra.contact.contactList.map(
    (contact, index) => {
      return (
        <div key={index} className="flex flex-col mb-2">
          <div className="flex mb-2">
            <div className="w-1/2 pr-4">
              <input
                type="text"
                name="contact_type"
                value={getValue(contact.type)}
                onChange={(e) =>
                  handleChange(
                    ["extra", "contact", "contactList", index, "type"],
                    e.target.value,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
            <div className="w-1/2 pr-4">
              <input
                type="text"
                name="contact_name"
                value={getValue(contact.name)}
                onChange={(e) =>
                  handleChange(
                    ["extra", "contact", "contactList", index, "name"],
                    e.target.value,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <input
                type="text"
                name="contact_phone"
                value={getValue(
                  property.extra.contact.contactList[index].phone
                )}
                onChange={(e) =>
                  handleChange(
                    ["extra", "contact", "contactList", index, "phone"],
                    e.target.value,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
            <div className="w-1/2 pr-4">
              <input
                type="text"
                name="contact_note"
                value={getValue(property.extra.contact.contactList[index].note)}
                onChange={(e) =>
                  handleChange(
                    ["extra", "contact", "contactList", index, "note"],
                    e.target.value,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
          </div>
          <div
            onClick={() => removeContact(index, setProperty)}
            className="underline text-orange-500 cursor-pointer text-sm py-3 border-b"
          >
            삭제
          </div>
        </div>
      );
    }
  );

  return (
    <div className="my-6">
      <div className="mb-2">
        <div className="text-blue-600 text-base font-bold mb-2">
          연락처 정보
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-28">
            매물 담당자
          </div>
          <div className="flex">
            <input
              type="text"
              name="staff_name"
              value={getValue(property.extra.contact.staffName)}
              onChange={(e) =>
                handleChange(
                  ["extra", "contact", "staffName"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        {contactList}
        <Button
          primary
          rounded
          onClick={() => addContact(setProperty)}
          className="py-0.5 px-2"
          type="button"
        >
          + 연락처추가
        </Button>
      </div>
    </div>
  );
};

export default ItemInfoContact;
