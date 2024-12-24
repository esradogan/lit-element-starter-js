const messages = {
  en: {
    addNew: 'Add New',
    employeeList: 'Employee List',
    actions: 'Actions',
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfEmployement: 'Date of Employement',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'E-mail',
    department: 'Department',
    position: 'Position',
  },
  tr: {
    addNew: 'Yeni Ekle',
    employeeList: 'Çalışan Listesi',
    actions: 'Aksiyonlar',
    firstName: 'Ad',
    lastName: 'Soyad',
    dateOfEmployement: 'İşe başlama tarihi',
    dateOfBirth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
  },
};

export function getMessage(key) {
  const lang = document.documentElement.lang || 'en';
  return messages[lang][key] || key;
}
