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
    edit: 'Edit',
    delete: 'Delete',
    createEmployee: 'Create Employee',
    editEmployee: 'Edit Employee',
    cancel: 'Cancel',
    proceed: 'Proceed',
    selectedEmpRecord:'Selected employee record',
    willbeDeleted: 'will be deleted',
    areYouSure: 'Are you sure?'
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
    edit: 'Düzenle',
    delete: 'Sil',
    createEmployee: 'Çalışan Ekle',
    editEmployee: 'Çalışanı Düzenle',
    cancel: 'İptal',
    proceed: 'İlerle',
    selectedEmpRecord:'Seçilen çalışan',
    willbeDeleted: 'kişisinin kaydı silinecektir',
    areYouSure: 'Emin misiniz?'

  },
};

export function getMessage (key) {
  const lang = document.documentElement.lang || 'en';
  return messages[lang][key] || key;
}
