export interface Tagihan {
  id: string;
  no_tagihan: string;
  nominal: number;
  status: string;
  semester: string;
  tahun: string;
  master_tagihan: {
    nama: string;
    deskripsi: string;
    jenis: string;
  };
  expire_at: string;
}
