"use client";

const AddClassForm = ({ fields }) => {
  const allowedInputTypes = [
    "text",
    "number",
    "email",
    "password",
    "date",
    "tel",
    "url",
    "file",
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {Array.isArray(fields) &&
        fields.map((element, index) => {
          // ROWS
          if (element.type === "row" && Array.isArray(element.fields)) {
            return (
              <div className="form-row donation-row" key={`row-${index}`}>
                {element.fields.map((subField, subIndex) => {
                  const inputType = allowedInputTypes.includes(subField.type)
                    ? subField.type
                    : "text";

                  return (
                    <div
                      className="form-group"
                      key={`field-${subIndex}`}
                    >
                      <label>
                        {subField.required && (
                          <span className="required-star">*</span>
                        )}
                        {subField.label}
                      </label>

                      {subField.type === "select" ? (
                        <select defaultValue="">
                          <option value="">
                            Select {subField.label}
                          </option>

                          {subField.options?.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={inputType}
                          placeholder={subField.placeholder || ""}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }

          // TEXTAREA
          if (element.type === "textarea") {
            return (
              <div
                className="form-group full-width"
                key={`textarea-${index}`}
              >
                <label>
                  {element.required && (
                    <span className="required-star">*</span>
                  )}
                  {element.label}
                </label>

                <textarea
                  rows={element.rows || 4}
                  placeholder={element.placeholder || ""}
                />
              </div>
            );
          }

          // SINGLE FIELD
          const fieldType = allowedInputTypes.includes(element.type)
            ? element.type
            : "text";

          return (
            <div
              className="form-group full-width"
              key={`single-${index}`}
            >
              <label>
                {element.required && (
                  <span className="required-star">*</span>
                )}
                {element.label}
              </label>

              {element.type === "select" ? (
                <select defaultValue="">
                  <option value="">
                    Select {element.label}
                  </option>

                  {element.options?.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={fieldType}
                  placeholder={element.placeholder || ""}
                />
              )}
            </div>
          );
        })}

      <div className="donation-buttons">
        <button type="submit" className="btn-save">
          Save 
        </button>
      </div>
    </form>
  );
};

export default AddClassForm;