import { useState } from "react";
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth-slice"


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = () => {

    event.preventDefault();
    dispatch(login({ email: email, password: password }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("hello you are logged in")
        navigate("/portfolio");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-96">
				<form
					onSubmit={handleSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Login
					</p>
					<FormInput
            inputLabel="Email"
            labelFor="email"
            inputType="email"
            inputId="email"
            inputName="email"
            placeholderText="Your email"
            ariaLabelName="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            inputLabel="Password"
            labelFor="password"
            inputType="password"
            inputId="password"
            inputName="password"
            placeholderText="Your password"
            ariaLabelName="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

					<div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
						<Button
							title="Login"
							type="submit"
							aria-label="Login"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Auth;