const supabase = require("../config/supabase");

const listJobPostings = async (req, res) => {
  try {
    const { data: job_postings, error } = await supabase
      .from("job_posting")
      .select("*");
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ job_postings });
  } catch (error) {
    console.error("❌ Lỗi server:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

const listJobPostingId = async (req, res) => {
  try {
    const job_posting_id = req.params.id;

    if (!job_posting_id) {
      return res.status(400).json({ error: "Thiếu ID bài đăng" });
    }

    const { data: job_posting, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("job_posting_id", job_posting_id) // sửa tên cột
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ job_posting });
  } catch (error) {
    console.error("❌ Lỗi server:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

const postJobPosting = async (req, res) => {
  try {
    const {
      account_id,
      company_id,
      position_name,
      job_description,
      requirements,
      salary,
      deadline,
      experience_years,
      education_level,
      benefits,
      working_time,
      status,
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!account_id || !company_id || !position_name || !job_description) {
      return res.status(400).json({
        success: false,
        message:
          "Thiếu dữ liệu bắt buộc (account_id, company_id, position_name, job_description)",
      });
    }

    // Chèn vào DB
    const { data, error } = await supabase
      .from("job_posting")
      .insert([
        {
          account_id,
          company_id,
          position_name,
          job_description,
          requirements: requirements || "",
          salary: salary || null,
          deadline: deadline || null,
          experience_years: experience_years || 0,
          education_level: education_level || "",
          benefits: benefits || "",
          working_time: working_time || "",
          status: status || "open",
        },
      ])
      .select(); // select để trả về data vừa insert

    if (error) {
      console.error("❌ Lỗi khi thêm job_posting:", error);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: "Đăng tin tuyển dụng thành công",
      job_posting: data[0], // trả về bản ghi vừa tạo
    });
  } catch (error) {
    console.error("❌ Lỗi server:", error);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
const deleteJobPosting = async (req, res) => {};
const updateJobPosting = async (req, res) => {};
module.exports = {
  listJobPostings,
  postJobPosting,
  listJobPostingId,
  deleteJobPosting,
  updateJobPosting,
};
