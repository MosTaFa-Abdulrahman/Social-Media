import "./right.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

function Right() {
  const { currentUser } = useContext(AuthContext);

  const { data } = useFetch(`user/get/friends/${currentUser._id}`);
  const { data: usersData } = useFetch("user/find");

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Your Friends</span>
          <div className="user">
            {data.map((friend) => (
              <div className="userInfo" key={friend._id}>
                <NavLink to={`/profile/${friend.username}`} className="link">
                  <img
                    src={
                      friend.profilePicture ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAbFBMVEX///8AAADV1dX7+/v19fX4+PhsbGza2trv7+/r6+vf39/o6OhlZWVvb2/l5eXS0tLExMSMjIxfX182NjaGhoYvLy9DQ0Obm5tUVFR/f3+ysrLMzMwjIyO5ubmqqqqioqIcHBxKSkoPDw93d3cskz1MAAAENElEQVR4nO1a2cKyOgwUAVlkEZFFEUV9/3f89WjSgiKhi9+56NxSyrTNMklZLAwMDAwMDAwMDAz+93CD0PO8cO3+HYNlFtV5Z1lWl9dR1vwFkza2hli19k8pJNUbhSeq5Gcc3Ow4QsKyjrsfHcwmH+XwQLH5AQf73R6GiLVvx/oyScKySs3WkRQEEnfr8HSS8AZfW1VtmqyTtK3ia/9Jqo/EuvehaONwz5xm1Xuq7VD8kt+G5dvzJW+4pa+JBbfYovk4IuXMJtJD4sy+cHNGxjg3NqjSQSJg82dfhnGxfa2BxY1EYrHImOmoJ5Hi5LuJkYzGZ+ORwRamrsdsAmCzoapJsK2YDgQsrKiOXfs5lo/eFCtmAfMep87jARfDhloSm3lBADejVcpi95r1SksPSUf0p1lAs6eGAMgoF5WCx4cdPhNfOMELKnNaSHfTJ9BZVcodNE6KhzzgguhRaZ5g8zm17LFBiqhMrJAo6SEZzPl75psHSFD0LHnTyIKun3Sy+NsTAfcvyNYJVaRK60RPpQYhR0ciwWqIGoQwzL3XC+LwrzM3+Dx38yiwo9ekW+ILML5WWr6joqUdCR6IShfhZCdNMCBpxSocpr1SSh0fRI5ixcdWtycM3s3bOTo87E9M+x7rcqj00/+ABXsRTIz0sfumvmxnC5zy1kjfVnCHPbFE1kqhmNBssM7VdjwWuWwnLC396JbNX48Fr7Bmgw46SHC16h2njyMOXKfvpocE1z24I39fasu3prfa7gecXs81rzyWMZ2w4juAtKpaEP6g9VvG2WnTbE5ZfOk/mAwqUnBKi4JcV7PzBfc2zcGKNR7HC+dJEtSSWgJONX5R9ESXaT6PxXo3QeGJvc4LEvtMux65O2ql7b7Iq6c/jyg13ZBknz/XHbvPD1QLrQeC1fAreb07eEkSBEGSeIesfrta3Cq3jnDwjWvVDD3Bb6rBtVWhWOak/en3Ywo/HfiQ0kqg5Wfu9t+SRLDrxROFImPDzxuFE6OT3r2vsqKdJ5FT7q8b3ogUXXiH3JQ3WnB2eFmmxEQDbmH0PHViLxUq7s84mTfH1HitLE+C3Qle57ndkoVU6f5BIm5mDXtVthvOzuOz9v+GAzsTOUHOJhJpGTJZJiW/mPSPhFaDGfAoI7/YYsT0LLY9ZbqvNk4iGoeZv4prLww94h6P1i1sGe4FphBXb0uYohStUVBUyHSGsIoSzWpo4TL5KJRcCpbGFwkSiwUId8ECGmXF/KjJAwOfmJ+B8u/kugAOZDWxZhvoR9nEjM4q8jKGLLkD4SKXiK9iYpZNy9ivFfFVkDfSP6E5EPxEcgnUN/LNbGjEiphnLPFuHyDIBf7fcmuJfewDkqJAKkGBI1/jgZMISB28dZIv8SAIXwVYgH/Jl92Y3eezsJdPpPK9Szd9zfXbX+cNDAwMDAwMDAwMBvgHVecqO6K/KbgAAAAASUVORK5CYII="
                    }
                    alt=""
                  />
                </NavLink>
                <span>{friend.username}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="item">
          <span>Some Of Users</span>
          <div className="user">
            {usersData.map((user) => (
              <div className="userInfo" key={user._id}>
                <NavLink to={`/profile/${user.username}`} className="link">
                  <img
                    src={
                      user.profilePicture ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAbFBMVEX///8AAADV1dX7+/v19fX4+PhsbGza2trv7+/r6+vf39/o6OhlZWVvb2/l5eXS0tLExMSMjIxfX182NjaGhoYvLy9DQ0Obm5tUVFR/f3+ysrLMzMwjIyO5ubmqqqqioqIcHBxKSkoPDw93d3cskz1MAAAENElEQVR4nO1a2cKyOgwUAVlkEZFFEUV9/3f89WjSgiKhi9+56NxSyrTNMklZLAwMDAwMDAwMDAz+93CD0PO8cO3+HYNlFtV5Z1lWl9dR1vwFkza2hli19k8pJNUbhSeq5Gcc3Ow4QsKyjrsfHcwmH+XwQLH5AQf73R6GiLVvx/oyScKySs3WkRQEEnfr8HSS8AZfW1VtmqyTtK3ia/9Jqo/EuvehaONwz5xm1Xuq7VD8kt+G5dvzJW+4pa+JBbfYovk4IuXMJtJD4sy+cHNGxjg3NqjSQSJg82dfhnGxfa2BxY1EYrHImOmoJ5Hi5LuJkYzGZ+ORwRamrsdsAmCzoapJsK2YDgQsrKiOXfs5lo/eFCtmAfMep87jARfDhloSm3lBADejVcpi95r1SksPSUf0p1lAs6eGAMgoF5WCx4cdPhNfOMELKnNaSHfTJ9BZVcodNE6KhzzgguhRaZ5g8zm17LFBiqhMrJAo6SEZzPl75psHSFD0LHnTyIKun3Sy+NsTAfcvyNYJVaRK60RPpQYhR0ciwWqIGoQwzL3XC+LwrzM3+Dx38yiwo9ekW+ILML5WWr6joqUdCR6IShfhZCdNMCBpxSocpr1SSh0fRI5ixcdWtycM3s3bOTo87E9M+x7rcqj00/+ABXsRTIz0sfumvmxnC5zy1kjfVnCHPbFE1kqhmNBssM7VdjwWuWwnLC396JbNX48Fr7Bmgw46SHC16h2njyMOXKfvpocE1z24I39fasu3prfa7gecXs81rzyWMZ2w4juAtKpaEP6g9VvG2WnTbE5ZfOk/mAwqUnBKi4JcV7PzBfc2zcGKNR7HC+dJEtSSWgJONX5R9ESXaT6PxXo3QeGJvc4LEvtMux65O2ql7b7Iq6c/jyg13ZBknz/XHbvPD1QLrQeC1fAreb07eEkSBEGSeIesfrta3Cq3jnDwjWvVDD3Bb6rBtVWhWOak/en3Ywo/HfiQ0kqg5Wfu9t+SRLDrxROFImPDzxuFE6OT3r2vsqKdJ5FT7q8b3ogUXXiH3JQ3WnB2eFmmxEQDbmH0PHViLxUq7s84mTfH1HitLE+C3Qle57ndkoVU6f5BIm5mDXtVthvOzuOz9v+GAzsTOUHOJhJpGTJZJiW/mPSPhFaDGfAoI7/YYsT0LLY9ZbqvNk4iGoeZv4prLww94h6P1i1sGe4FphBXb0uYohStUVBUyHSGsIoSzWpo4TL5KJRcCpbGFwkSiwUId8ECGmXF/KjJAwOfmJ+B8u/kugAOZDWxZhvoR9nEjM4q8jKGLLkD4SKXiK9iYpZNy9ivFfFVkDfSP6E5EPxEcgnUN/LNbGjEiphnLPFuHyDIBf7fcmuJfewDkqJAKkGBI1/jgZMISB28dZIv8SAIXwVYgH/Jl92Y3eezsJdPpPK9Szd9zfXbX+cNDAwMDAwMDAwMBvgHVecqO6K/KbgAAAAASUVORK5CYII="
                    }
                    alt=""
                  />
                </NavLink>
                <p>
                  <span>{user.username}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAbFBMVEX///8AAADV1dX7+/v19fX4+PhsbGza2trv7+/r6+vf39/o6OhlZWVvb2/l5eXS0tLExMSMjIxfX182NjaGhoYvLy9DQ0Obm5tUVFR/f3+ysrLMzMwjIyO5ubmqqqqioqIcHBxKSkoPDw93d3cskz1MAAAENElEQVR4nO1a2cKyOgwUAVlkEZFFEUV9/3f89WjSgiKhi9+56NxSyrTNMklZLAwMDAwMDAwMDAz+93CD0PO8cO3+HYNlFtV5Z1lWl9dR1vwFkza2hli19k8pJNUbhSeq5Gcc3Ow4QsKyjrsfHcwmH+XwQLH5AQf73R6GiLVvx/oyScKySs3WkRQEEnfr8HSS8AZfW1VtmqyTtK3ia/9Jqo/EuvehaONwz5xm1Xuq7VD8kt+G5dvzJW+4pa+JBbfYovk4IuXMJtJD4sy+cHNGxjg3NqjSQSJg82dfhnGxfa2BxY1EYrHImOmoJ5Hi5LuJkYzGZ+ORwRamrsdsAmCzoapJsK2YDgQsrKiOXfs5lo/eFCtmAfMep87jARfDhloSm3lBADejVcpi95r1SksPSUf0p1lAs6eGAMgoF5WCx4cdPhNfOMELKnNaSHfTJ9BZVcodNE6KhzzgguhRaZ5g8zm17LFBiqhMrJAo6SEZzPl75psHSFD0LHnTyIKun3Sy+NsTAfcvyNYJVaRK60RPpQYhR0ciwWqIGoQwzL3XC+LwrzM3+Dx38yiwo9ekW+ILML5WWr6joqUdCR6IShfhZCdNMCBpxSocpr1SSh0fRI5ixcdWtycM3s3bOTo87E9M+x7rcqj00/+ABXsRTIz0sfumvmxnC5zy1kjfVnCHPbFE1kqhmNBssM7VdjwWuWwnLC396JbNX48Fr7Bmgw46SHC16h2njyMOXKfvpocE1z24I39fasu3prfa7gecXs81rzyWMZ2w4juAtKpaEP6g9VvG2WnTbE5ZfOk/mAwqUnBKi4JcV7PzBfc2zcGKNR7HC+dJEtSSWgJONX5R9ESXaT6PxXo3QeGJvc4LEvtMux65O2ql7b7Iq6c/jyg13ZBknz/XHbvPD1QLrQeC1fAreb07eEkSBEGSeIesfrta3Cq3jnDwjWvVDD3Bb6rBtVWhWOak/en3Ywo/HfiQ0kqg5Wfu9t+SRLDrxROFImPDzxuFE6OT3r2vsqKdJ5FT7q8b3ogUXXiH3JQ3WnB2eFmmxEQDbmH0PHViLxUq7s84mTfH1HitLE+C3Qle57ndkoVU6f5BIm5mDXtVthvOzuOz9v+GAzsTOUHOJhJpGTJZJiW/mPSPhFaDGfAoI7/YYsT0LLY9ZbqvNk4iGoeZv4prLww94h6P1i1sGe4FphBXb0uYohStUVBUyHSGsIoSzWpo4TL5KJRcCpbGFwkSiwUId8ECGmXF/KjJAwOfmJ+B8u/kugAOZDWxZhvoR9nEjM4q8jKGLLkD4SKXiK9iYpZNy9ivFfFVkDfSP6E5EPxEcgnUN/LNbGjEiphnLPFuHyDIBf7fcmuJfewDkqJAKkGBI1/jgZMISB28dZIv8SAIXwVYgH/Jl92Y3eezsJdPpPK9Szd9zfXbX+cNDAwMDAwMDAwMBvgHVecqO6K/KbgAAAAASUVORK5CYII="
                alt=""
              />
              <div className="online" />
              <span>mostafa</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Right;
