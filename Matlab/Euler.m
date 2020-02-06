function [new] = Euler(old,deriv, h)
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here
new= old+h*deriv;
end

