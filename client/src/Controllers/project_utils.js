// stringNormalize: strips diacritics and converts to lower case
function stringNormalize(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// stringMatch: returns true if searchString is a substring of dataString
function stringMatch(property, search) {
  const d = stringNormalize(property);
  const s = stringNormalize(search);
  return d.includes(s);
}

function searchString(project, search) {
  return project.filter(
    (b) =>
      stringMatch(b.title, search) ||
      stringMatch(b.description, search) ||
      stringMatch(b.department, search) ||
      stringMatch(b.requiredSkills, search) ||
      stringMatch(b.scholarships, search) ||
      stringMatch(b.contactInfo, search)
  );
}
