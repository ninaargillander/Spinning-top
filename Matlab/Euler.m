function [new] = Euler(old,deriv, h)
    new= old+h*deriv;
end

