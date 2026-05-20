import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { sampleData } from "./data";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transactionsRef = collection(db, "transactions");

  const getTransactions = async () => {
    const q = query(
      transactionsRef,
      orderBy("createdAt", "desc")
    );

    const data = await getDocs(q);

    const transactionList = data.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setTransactions(transactionList);

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactionList)
    );
  };

  useEffect(() => {

    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    getTransactions();

  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      amount.trim() === "" ||
      category.trim() === "" ||
      date.trim() === ""
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    await addDoc(transactionsRef, {
      title,
      amount: Number(amount),
      type,
      category,
      date,
      createdAt: new Date(),
    });

    setTitle("");
    setAmount("");
    setType("income");
    setCategory("");
    setDate("");

    getTransactions();
  };

  const deleteTransaction = async (id) => {
    const transactionDoc = doc(db, "transactions", id);

    await deleteDoc(transactionDoc);

    getTransactions();
  };

  const uploadSampleData = async () => {
    setLoading(true);

    try {

      const existingData =
        await getDocs(transactionsRef);

      if (!existingData.empty) {
        alert(
          "Firestore'da zaten veri var. Tekrar yükleme yapılmadı."
        );

        setLoading(false);

        return;
      }

      for (const item of sampleData) {

        await addDoc(transactionsRef, {
          ...item,
          createdAt: new Date(),
        });

      }

      alert(
        "Örnek veriler Firestore'a yüklendi!"
      );

      getTransactions();

    } catch (error) {

      console.error(error);

      alert(
        "Veriler yüklenirken hata oluştu."
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteAllTransactions = async () => {

    const confirmDelete = window.confirm(
      "Tüm verileri silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    const data = await getDocs(transactionsRef);

    if (data.empty) {
      alert("Silinecek veri yok.");
      return;
    }

    const batch = writeBatch(db);

    data.docs.forEach((item) => {
      batch.delete(item.ref);
    });

    await batch.commit();

    localStorage.removeItem("transactions");

    alert("Tüm veriler silindi!");

    getTransactions();
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

  const balance =
    totalIncome - totalExpense;

  return (
    <div className="app-bg min-vh-100 py-5">

      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h1 className="dashboard-title m-0">
            Bütçe Takip Uygulaması
          </h1>

          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            onClick={uploadSampleData}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>

                Veriler Yükleniyor...
              </>
            ) : (
              "Örnek Verileri Yükle"
            )}

          </button>

        </div>

        <div className="row g-3 mb-4">

          <div className="col-md-4">

            <div className="card summary-card">

              <div className="card-body">

                <h5>Toplam Gelir</h5>

                <h3 className="text-success">
                  {totalIncome} TL
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card summary-card">

              <div className="card-body">

                <h5>Toplam Gider</h5>

                <h3 className="text-danger">
                  {totalExpense} TL
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card summary-card">

              <div className="card-body">

                <h5>Kalan Bakiye</h5>

                <h3
                  className={
                    balance >= 0
                      ? "text-primary"
                      : "text-danger"
                  }
                >
                  {balance} TL
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="card shadow mb-4">

          <div className="card-body">

            <h4 className="mb-3">
              Yeni Gelir / Gider Ekle
            </h4>

            <form onSubmit={addTransaction}>

              <div className="row g-3">

                <div className="col-md-3">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Başlık giriniz"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Tutar"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-2">

                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value)
                    }
                  >

                    <option value="income">
                      Gelir
                    </option>

                    <option value="expense">
                      Gider
                    </option>

                  </select>

                </div>

                <div className="col-md-2">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kategori"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-1">

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                  >
                    Ekle
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

        <div className="card shadow transaction-card">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h4 className="m-0">
                Firestore İşlem Listesi
              </h4>

              <button
                className="btn btn-danger"
                onClick={
                  deleteAllTransactions
                }
              >
                Tüm Verileri Sil
              </button>

            </div>

            {transactions.length === 0 ? (

              <p className="text-muted">
                Firestore üzerinde henüz veri yok.
              </p>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead>

                    <tr>

                      <th>Başlık</th>
                      <th>Kategori</th>
                      <th>Tutar</th>
                      <th>Tür</th>
                      <th>Tarih</th>
                      <th>İşlem</th>

                    </tr>

                  </thead>

                  <tbody>

                    {transactions.map((item) => (

                      <tr key={item.id}>

                        <td>{item.title}</td>

                        <td>{item.category}</td>

                        <td>
                          {item.amount} TL
                        </td>

                        <td>

                          <span
                            className={
                              item.type ===
                              "income"
                                ? "badge bg-success"
                                : "badge bg-danger"
                            }
                          >

                            {item.type ===
                            "income"
                              ? "Gelir"
                              : "Gider"}

                          </span>

                        </td>

                        <td>{item.date}</td>

                        <td>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteTransaction(
                                item.id
                              )
                            }
                          >
                            Sil
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;