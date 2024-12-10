import { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
  username: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(formData.password)) {
      newErrors.password =
        'Password must be between 6 and 20 characters and contain at least one capital letter and a number';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //вернёт true, если валидация прошла
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <p>{errors.dob}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />I
          agree to the terms and conditions
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
